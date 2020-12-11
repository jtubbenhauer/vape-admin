import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FlavoursService {

  user = JSON.parse(localStorage.getItem('user'));

  constructor(private afs: AngularFirestore, private router: Router) { }

  getSuppliers() {
    return this.afs.collection(this.user['uid']).doc('data').collection('suppliers').valueChanges();
  }

  getFlavours() {
    return this.afs.collection(this.user['uid']).doc('data').collection('flavours').valueChanges({ idField: 'id' });
  }

  getFlavourOptions() {
    return this.afs.collection(this.user['uid']).doc('data').collection('flavours').snapshotChanges();
  }

  getFlavourFromID(id) {
    return this.afs.collection(this.user['uid']).doc('data').collection('flavours').doc(id).valueChanges();
  }

  getFlavoursFromSupplier(supplier) {
    return this.afs.collection(`${this.user['uid']}/data/flavours`, ref => ref.where('supplier', '==', supplier));
  }

  addFlavour(data) {
    return this.afs.collection(this.user['uid']).doc('data').collection('flavours').add({
      'supplier': data.supplier,
      'name': data.name,
      'cost': data.cost,
      'stock': data.stock,
      'unit': data.unit
    })
  }

  updateFlavour(id, data) {
    this.afs.collection(this.user['uid']).doc('data').collection('flavours').doc(id).update(data);
  }

  deleteFlavour(id) {
    this.afs.collection(this.user['uid']).doc('data').collection('flavours').doc(id).delete();
    this.router.navigate(['admin/flavours']);
  }

  addFromCSV(data) {
    data.map(i => {
      this.addFlavour(i);
    })
  }

}
