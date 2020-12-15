import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  user = JSON.parse(localStorage.getItem('user'));
  uid = this.user['uid'];

  constructor(private afs: AngularFirestore, private router: Router) { }

  getInvoiceNo() {
    return this.afs.doc(`${this.uid}/data/invoicenum/id`).valueChanges();
  }

  getInvoices() {
    return this.afs.collection(`${this.uid}/data/invoices`);
  }

  getInvoice(id: string) {
    return this.afs.doc(`${this.uid}/data/invoices/${id}`);
  }

  getInvoiceItems(id: string) {
    return this.afs.collection(`${this.uid}/data/invoices/${id}/items`);
  }

  initInvoiceCount() {
    this.afs.doc(`${this.uid}/data/invoicenum/id`).set({count: 0})
  }

  incrementInvoiceCount() {
    let flag = 0;
    this.afs.doc(`${this.uid}/data/invoicenum/id`).valueChanges().subscribe(res => {
      if (flag === 0) {
        let num = res['count'] + 1;
        this.afs.doc(`${this.uid}/data/invoicenum/id`).update({count: num})
        flag++;
      }
    })
  }


  updateInvoice(invoiceNum, items) {
    items.map(i => {
      this.afs.doc(`${this.uid}/data/invoices/${invoiceNum}/items/${i.id}`).set({
        product: i.product,
          cost: i.cost,
          qty: i.qty,
          total: i.total,
          unit: i.unit
      }).then(() => {
        // this.router.navigate(['admin/invoices'])    
      })
    });
  }

  saveExistingInvoice(invoiceNum, invoiceDetails, items) {
    this.afs.doc(`${this.uid}/data/invoices/${invoiceNum}`).set({
      date: invoiceDetails.date,
      supplier: invoiceDetails.supplier,
      status: invoiceDetails.status
    }).then(() => {
      items.map(i => {
        this.afs.doc(`${this.uid}/data/invoices/${invoiceNum}/items/${i.id}`).set({
          product: i.product,
          cost: i.cost,
          qty: i.qty,
          total: i.total,
          unit: i.unit
        })
      });
      this.router.navigate(['admin/invoices'])
    })
  }

  saveNewInvoice(invoiceDetails, data) {
    this.afs.doc(`${this.uid}/data/invoices/${invoiceDetails.invoice}`).set({
      date: invoiceDetails.date,
      supplier: invoiceDetails.supplier,
      status: invoiceDetails.status
    }).then(() => {
      data.map(i => {
        this.afs.doc(`${this.uid}/data/invoices/${invoiceDetails.invoice}/items/${i.id}`).set({
          product: i.product,
          cost: i.cost,
          qty: i.qty,
          total: i.total,
          unit: i.unit
        })
      });
      this.router.navigate(['admin/invoices'])

    });
  }
}
