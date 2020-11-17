import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private afs: AngularFirestore) { }

  getSuppliers() {
    return this.afs.collection('suppliers').valueChanges({ idField: 'id' });
  }
  
  addSupplier(name) {
    return this.afs.collection('suppliers').add({'name': name})
  }

  deleteSupplier(id) {
    return this.afs.collection('suppliers').doc(id).delete();
  }
}

