import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FlavoursService {

  constructor(private afs: AngularFirestore) { }

  getSuppliers() {
    return this.afs.collection('suppliers').valueChanges();
  }

  getFlavours() {
    return this.afs.collection('flavours').valueChanges({ idField: 'id' });
  }

  getFlavourOptions() {
    return this.afs.collection('flavours').snapshotChanges();
  }

  addFlavour(data) {
    return this.afs.collection('flavours').add({
      'supplier': data.supplier,
      'name': data.name,
      'cost': data.cost,
      'stock': data.stock,
    })
  }

}
