import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MixingService {

  user = JSON.parse(localStorage.getItem('user'));
  uid = this.user.uid;

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

  updateFlavourStock(id, newStock) {
    this.afs.collection(this.uid).doc('data').collection('flavours').doc(id).update({'stock': newStock})
  }

  calcConcentrate(size, percentage) {
    return +((size * (percentage / 100)) * 1.0361).toFixed(1);
  }

  calcVG(size, vgPercentage) {
    return +((size * (vgPercentage / 100)) * 1.261).toFixed(1);
  }

  calcPG(size, addConc, addVG) {
    return +((size - (addVG / 1.261)-(addConc / 1.0361))*1.0361).toFixed(1);
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
}

