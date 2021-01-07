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
      'unit': data.unit,
      'stockml': +(this.calcStockMl(data.stock, data.unit))
    })
  }

  calcStockMl(stock: number, unit) {
    switch (unit) {
      case 'Millilitre':
        return +stock;
      case 'Litre':
        return +(stock * 1000).toFixed(2);
      case 'Ounce':
        return +(stock * 29.5735).toFixed(2);
      case '16 Ounce':
        return +(stock * 473.176).toFixed(2);
      case 'Gallon':
        return +(stock * 3785.41).toFixed(2);
    }
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
      
      i.supplier = this.capitilise(i.supplier);
      i.unit = this.capitilise(i.unit);
      i.stock = +i.stock;
      i.stockml = this.calcStockMl(+i.stock, this.capitilise(i.unit));
      i.cost = +i.cost;      
      this.afs.collection(`${this.user['uid']}/data/flavours`).add(i)
    })
  }

  capitilise(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

}
