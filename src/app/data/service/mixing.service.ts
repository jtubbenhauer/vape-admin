import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MixingService {

  constructor(private afs: AngularFirestore) { }

  getRecipesValue() {
    return this.afs.collection('recipes').snapshotChanges();
  }

  getFlavoursFromID(id: string) {
    return this.afs.collection('recipes').doc(id).collection('flavours').valueChanges();
  }

  getStockOnHand(recipe) {
    return this.afs.collection('flavours', ref => ref.where('supplier', '==', recipe['supplier']).where('name', '==', recipe['name'])).valueChanges();
  }

  getFlavourID(supplier, name) {
    return this.afs.collection('flavours', ref => ref.where('supplier', '==', supplier).where('name', '==', name)).snapshotChanges();
  }

  updateFlavourStock(id, newStock) {
    this.afs.collection('flavours').doc(id).update({'stock': newStock})
  }

  calcConcentrate(size, percentage) {
    return +((size * (percentage / 100)) * 1.0361).toFixed(2);
  }

  calcVG(size, vgPercentage) {
    return +((size * (vgPercentage / 100)) * 1.261).toFixed(2);
  }

  calcPG(size, addConc, addVG) {
    return +((size - (addVG / 1.261)-(addConc / 1.0361))*1.0361).toFixed(2);
  }
  
  getVGStock() {
    return this.afs.collection('base').doc('vg').valueChanges();
  }

  getPGStock() {
    return this.afs.collection('base').doc('pg').valueChanges();
  }

  updateBaseStock(base, stock) {
    this.afs.collection('base').doc(base).update({'stock': stock})
  }
}

