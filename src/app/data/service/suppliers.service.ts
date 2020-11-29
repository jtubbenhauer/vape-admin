import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  user = JSON.parse(localStorage.getItem('user'))

  constructor(private afs: AngularFirestore, private auth: AuthService) {
  }

  getSuppliers() {
    return this.afs.collection(this.user['uid']).doc('data').collection('suppliers').valueChanges({ idField: 'id' })
  }
  
  addSupplier(name) {
    
    return this.afs.collection(this.user['uid']).doc('data').collection('suppliers').add({'name': name})
    
  }

  deleteSupplier(id) {
    return this.afs.collection(this.user['uid']).doc('data').collection('suppliers').doc(id).delete();
  }
}

