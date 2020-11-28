import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FlavoursService {

  constructor(private afs: AngularFirestore, private router: Router) { }

  getSuppliers() {
    return this.afs.collection('suppliers').valueChanges();
  }

  getFlavours() {
    return this.afs.collection('flavours').valueChanges({ idField: 'id' });
  }

  getFlavourOptions() {
    return this.afs.collection('flavours').snapshotChanges();
  }

  getFlavourFromID(id) {
    return this.afs.collection('flavours').doc(id).valueChanges();
  }

  addFlavour(data) {
    return this.afs.collection('flavours').add({
      'supplier': data.supplier,
      'name': data.name,
      'cost': data.cost,
      'stock': data.stock,
    })
  }

  updateFlavour(id, data) {
    this.afs.collection('flavours').doc(id).update(data);
    window.alert('Flavour updated');
  }

  deleteFlavour(id) {
    this.afs.collection('flavours').doc(id).delete();
    this.router.navigate(['admin/flavours']);
  }

}
