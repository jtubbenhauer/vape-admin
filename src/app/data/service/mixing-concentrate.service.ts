import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MixingConcentrateService {

  recipe: any = [];

  name: any;
  supplier: any;
  percentage: any;
  on_hand: any;
  quantity: any;

  constructor(private afs: AngularFirestore) { }

  getRecipesValue() {
    return this.afs.collection('recipes').snapshotChanges();
  }

  createRecipe(id: string, size: number) {

    this.recipe = [];



    return this.afs.collection('recipes').doc(id).collection('flavours').valueChanges().subscribe(res => {
      res.map(i => {
        this.quantity = size * (i.percentage / 100);
        this.recipe.push({
          'supplier': i.supplier,
          'name': i.name,
          'percentage': i.percentage,
          'quantity': this.quantity
          });
        });

        this.recipe.map(recipe => {
          this.afs.collection('flavours', ref => ref.where('supplier', '==', recipe['supplier']).where('name', '==', recipe['name'])).valueChanges().subscribe(res => {
            res.map(flavour => {
              recipe.on_hand = flavour['stock']
            })
          })
        });
        console.log(this.recipe);
        
      });
    }
  
  
}

