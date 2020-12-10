import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  user = JSON.parse(localStorage.getItem('user'));
  uid = this.user['uid'];

  constructor(private afs: AngularFirestore) { }

  getInvoiceNo() {
    return this.afs.doc(`${this.uid}/data/invoicenum/id`).valueChanges();
  }

  initInvoiceCount() {
    this.afs.doc(`${this.uid}/data/invoicenum/id`).set({count: 1})
  }
}
