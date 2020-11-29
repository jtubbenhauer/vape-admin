import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Recipes } from "../schema/recipes";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  user = JSON.parse(localStorage.getItem('user'));
  uid = this.user.uid;

  constructor(private afs: AngularFirestore, private router: Router) { }

  getRecipes() {
    return this.afs.collection(this.uid).doc('data').collection('recipes').snapshotChanges().pipe(map(
      a => a.map(i => {
        const data = i.payload.doc.data() as Recipes;
        const id = i.payload.doc.id;
        return { id, ...data };
      })
    ))
  }

  getRecipe(id) {
    return this.afs.collection(this.uid).doc('data').collection('recipes').doc(id).get();
  }

  getIngredients(id) {
    return this.afs.collection(this.uid).doc('data').collection('recipes').doc(id).collection('flavours').valueChanges();
  }

  addIngredient(data) {
    this.afs.collection(this.uid).doc('data').collection('recipes').doc(data.id).collection('flavours').add({
      'supplier': data.supplier,
      'name': data.name,
      'percentage': data.percentage
    })
  }

  addRecipeAndRedirect(name, collection) {
    if (!collection) {
      collection = '';
    }
    this.afs.collection(this.uid).doc('data').collection('recipes').add({
      'name': name,
      'collection': collection
    }).then(doc => {
      console.log(doc);
      
      this.router.navigate(['admin/recipes/' + doc.id])
    })
  }

  deleteRecipe(id) {
    return this.afs.collection(this.uid).doc('data').collection('recipes').doc(id).delete();
  }

}

