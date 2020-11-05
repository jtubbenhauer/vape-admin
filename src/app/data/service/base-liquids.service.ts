import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { BaseLiquids } from "app/data/schema/base-liquids";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class BaseLiquidsService {

  constructor(private afs: AngularFirestore) { }

  getVG() {
    return this.afs.doc<BaseLiquids>('base/vg').snapshotChanges().pipe(
      map(res => {
        const data = res.payload.data();
        return data
      })
    )
  }

  getPG() {
    return this.afs.doc<BaseLiquids>('base/pg').snapshotChanges().pipe(
      map(res => {
        const data = res.payload.data();
        return data
      })
    )
  }


}
