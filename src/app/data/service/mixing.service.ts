import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MixingService {

  user = JSON.parse(localStorage.getItem('user'));
  uid = this.user.uid;
  batchHistory = JSON.parse(localStorage.getItem('batches'));

  batchHistoryObserver = new BehaviorSubject(this.batchHistory);

  constructor(private afs: AngularFirestore) { }

  getRecipesValue() {
    return this.afs.collection(this.uid).doc('data').collection('recipes').snapshotChanges();
  }

  getFlavoursFromID(id: string) {
    return this.afs.collection(this.uid).doc('data').collection('recipes').doc(id).collection('flavours').valueChanges();
  }

  getStockOnHand(recipe) {
    return this.afs.collection(this.uid).doc('data').collection('flavours', ref => ref.where('supplier', '==', recipe['supplier']).where('name', '==', recipe['name'])).valueChanges();
  }

  getFlavourID(supplier, name) {
    return this.afs.collection(this.uid).doc('data').collection('flavours', ref => ref.where('supplier', '==', supplier).where('name', '==', name)).snapshotChanges();
  }

  updateFlavourStock(id, newStock, unit) {
    let num: number = 0;
    switch(unit) {
      case 'Millilitre':
        num = +newStock.toFixed(1);
        break;
      case 'Litre':
        num = +(newStock / 1000).toFixed(1);
        break;
      case 'Ounce':
        num = +(newStock / 29.574).toFixed(1);
        break;
      case '16 Ounce':
        num = +(newStock / 473.184).toFixed(1);
        break;
      case 'Gallon':
        num = +(newStock / 3785.4).toFixed(1);
        break;
    }
    this.afs.collection(this.uid).doc('data').collection('flavours').doc(id).update({'stock': num})
    this.afs.collection(this.uid).doc('data').collection('flavours').doc(id).update({'stockml': newStock})
  }

  calcConcentrate(size, percentage) {
    return +((size * (percentage / 100))).toFixed(1);
  }

  calcVG(size, vgPercentage) {
    return +((size * (vgPercentage / 100)) * 1.261).toFixed(1);
  }

  calcPG(size, addConc, addVG) {
    return +((size - (addVG / 1.261)-addConc)*1.0361).toFixed(1);
  }

  calcDoublerVG(size, vgPercentage) {
    return +(((+vgPercentage / 100) * +size) * 1.261).toFixed(1);
  }

  calcDoubler(size, flavourPercentage) {
    let conc = this.calcConcentrate(size, flavourPercentage);
    let vg = this.calcDoublerVG(size / 2, 60);
    let pg = this.calcDoublerPG(size / 2, vg, conc);
    return {
      'conc': +conc.toFixed(1),
      'vg': +vg.toFixed(1),
      'pg': +pg.toFixed(1)
    }
  }

  calcDoublerPG(size, addVG, addConcentrate) {
    return +((+size - (+addVG / 1.261) - +addConcentrate) * 1.0361).toFixed(1);
  }
  
  getVGStock() {
    return this.afs.collection(this.uid).doc('data').collection('base').doc('vg').valueChanges();
  }

  getPGStock() {
    return this.afs.collection(this.uid).doc('data').collection('base').doc('pg').valueChanges();
  }

  updateBaseStock(base, stock) {
    this.afs.collection(this.uid).doc('data').collection('base').doc(base).update({'stock': stock})
  }

  getRecipeByID(id) {
    return this.afs.collection(this.uid).doc('data').collection('recipes').doc(id).valueChanges();
  }

  updateConcentrate(id, num) {
    this.afs.collection(this.uid).doc('data').collection('recipes').doc(id).update({'concentrate': num})
  }

  addBatchHistory(recipe: string, type: string) {

    if (localStorage.getItem('batches')) {
      this.batchHistory = JSON.parse(localStorage.getItem('batches'));
    } else {
      this.batchHistory = [];
    }

    if (this.batchHistory.length < 5) {
      this.batchHistory.unshift(`${type} - ${recipe}`);
    } else {
      this.batchHistory.pop();
      this.batchHistory.unshift(`${type} - ${recipe}`);
    }
    
    localStorage.setItem('batches', JSON.stringify(this.batchHistory));
    this.batchHistoryObserver.next(this.batchHistory)
  }

  getBatchHistory() {
    return this.batchHistoryObserver;
  }
}

