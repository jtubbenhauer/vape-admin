import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Recipes } from "../schema/recipes";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private afs: AngularFirestore) { }

  getRecipes() {
    return this.afs.collection('recipes').snapshotChanges().pipe(map(
      a => a.map(i => {
        const data = i.payload.doc.data() as Recipes;
        const id = i.payload.doc.id;
        return { id, ...data };
      })
    ))
  }

}

