import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { stringify } from 'querystring';

export interface recipeList {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MixingConcentrateService {

  recipeList: recipeList[] = [];

  constructor(private afs: AngularFirestore) { }

  getRecipesValue() {

    return this.afs.collection('recipes').snapshotChanges();
  }

  getIdFromName(name) {

    return this.afs.collection('recipes', ref => ref.where('name', '==', name)).snapshotChanges();
  }

}

