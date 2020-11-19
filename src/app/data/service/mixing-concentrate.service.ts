import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MixingConcentrateService {

  recipe: any = [];

  name: any;
  supplier: any;
  percentage: any;
  on_hand: any;
  quantity: any;

  flavourId: string;

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
  
}

