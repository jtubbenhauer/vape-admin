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
          unit: i.unit,
          received: i.received
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
          unit: i.unit,
          received: i.received
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
          unit: i.unit,
          received: i.received
        })
      });
      this.router.navigate(['admin/invoices'])
    });
  }

  deleteInvoice(invoiceNum) {
    this.afs.doc(`${this.uid}/data/invoices/${invoiceNum}`).delete().then(() => this.router.navigate(['admin/invoices']));
  }



  receiveStock(data) {
    data.map(i => {      
      let addMl: number = +this.receivedToMl(i.unit, i.received)
      let count = 0;
      let totalStockMl: number = 0;
      let newStock: number = 0;
      this.afs.doc(`${this.uid}/data/flavours/${i.id}`).valueChanges().subscribe(res => {
        if (count === 0) {
          totalStockMl = +(addMl + res['stockml']).toFixed(1);          
          switch (i.unit) {
            case 'Millilitre':
              newStock = +totalStockMl.toFixed(1);
              break;
            case 'Litre':
              newStock = +(totalStockMl / 1000).toFixed(1)
              break;
            case 'Ounce':
              newStock = +(totalStockMl / 29.574).toFixed(1)   
              break;           
            case '16 Ounce':
              newStock = +(totalStockMl / 473.176).toFixed(1)
              break;
            case 'Gallon': 
              newStock = +(totalStockMl / 3785.41).toFixed(1)
              break;
          }
          count++
        };
        this.afs.doc(`${this.uid}/data/flavours/${i.id}`).update({
          cost: i.cost,
          stock: newStock,
          stockml: totalStockMl,
          unit: i.unit
        });
      })      
    })
  }

  receivedToMl(unit, received) {
    switch (unit) {
      case 'Millilitre':
        return +received.toFixed(1);
      case 'Litre':
        return +(received * 1000).toFixed(1);
      case 'Ounce':
        return +(received * 29.5735).toFixed(1);
      case '16 Ounce':
        return +(received * 473.176).toFixed(1);
      case 'Gallon':
        return +(received * 3785.41).toFixed(1);
    }
  }

  closeInvoice(invoice) {
    this.afs.doc(`${this.uid}/data/invoices/${invoice}`).update({status: 'Closed'})
  }
}
