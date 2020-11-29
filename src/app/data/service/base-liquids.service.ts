import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { BaseLiquids } from "app/data/schema/base-liquids";
import { map, take } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class BaseLiquidsService {

  user = JSON.parse(localStorage.getItem('user'));

  constructor(private afs: AngularFirestore) {
  }

  getVG() {
    return this.afs.collection(this.user['uid']).doc<BaseLiquids>('data/base/vg').snapshotChanges().pipe(
      map(res => {
        const data = res.payload.data();
        return data
      })
    )
  }


  getPG() {
    return this.afs.collection(this.user['uid']).doc<BaseLiquids>('data/base/pg').snapshotChanges().pipe(
      map(res => {
        const data = res.payload.data();
        return data
      })
    )
  }

  addStock(base: any, i: any) {
    if (base === 'vg') {
      this.getVG().pipe(take(1)).subscribe(res => {
        let newStock = res.stock + Number(i);
        this.afs.collection(this.user['uid']).doc(`data/base/${base}`).update({stock: newStock})
      });
    } else if (base === 'pg') {
      this.getPG().pipe(take(1)).subscribe(res => {
        let newStock = res.stock + Number(i);
        this.afs.collection(this.user['uid']).doc(`data/base/${base}`).update({stock: newStock})
      });
    } else {
      console.log('Error');
    };
  };

  updateCost(base: any, cost: any) {
    if (base === 'vg') {
      this.afs.collection(this.user['uid']).doc('data/base/vg').update({cost: cost})
    } else if (base === 'pg') {
      this.afs.collection(this.user['uid']).doc('data/base/pg').update({cost: cost})
    } else {
      console.log('Error');
    }
  }

}
