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
    return this.afs.collection('flavours').valueChanges();
  }

  addFlavour(data) {
    return this.afs.collection('flavours').add({
      'supplier': data.supplier,
      'name': data.name,
      'cost': data.cost,
      'stock': data.stock,
    })
  }


//   Collection Group!!
//   getFlavours() {
//     const currentDoc = this.afs.collection('suppliers', ref => ref.where('name', '==', 'FlavourArt'));
//     let id: any;

//     currentDoc.snapshotChanges().subscribe(res => {
//       res.map(item => {
//         this.afs.collection(`suppliers/${item.payload.doc.id}/suppliers_flavours`).valueChanges().subscribe(res => {
//           console.log(res);
        
//         })
//     })

    
//   }

//     )
// }
}
