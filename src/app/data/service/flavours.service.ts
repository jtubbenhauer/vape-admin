import { Injectable } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlavoursService {

  constructor(private afs: AngularFirestore) { }

  getSuppliers() {
    this.afs.collection('suppliers').valueChanges().subscribe(res => {
      console.log(res);
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
