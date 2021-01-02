import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app'
import { Router } from "@angular/router";
import { BaseLiquidsService } from './base-liquids.service';

//https://dev.to/dobis32/user-authentication-with-angular-angularfire-3eja
//https://medium.com/javascript-in-plain-english/how-to-add-firebase-authentication-to-pwa-or-angular-project-using-angularfire-83a8f61d367c
//https://angular-templates.io/tutorials/about/firebase-authentication-with-angular

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private afs: AngularFirestore, private firebaseAuth: AngularFireAuth, private router: Router, private initService: BaseLiquidsService) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(value => {
      localStorage.setItem('user', JSON.stringify(value.user))
      this.initBase(value.user.uid);      
      this.router.navigate(['admin'])
    })
    .catch(err => {
      console.log(err.message);
    })
  };

  login(email:string, password: string) {
    // this.firebaseAuth.signInWithEmailAndPassword(email, password).then(value => {
    //   localStorage.setItem('user', JSON.stringify(value.user))      
    //   this.router.navigate(['admin'])
    // }).catch(err => {
    //   console.log(err.message);
    // })

    return this.firebaseAuth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user')
    this.router.navigate([''])
  }

  initBase(uid) {
    this.afs.collection(uid).doc('data').collection('base').doc('vg').set({
      'stock': 0,
      'cost': 0
    });
    this.afs.collection(uid).doc('data').collection('base').doc('pg').set({
      'stock': 0,
      'cost': 0
    });
  }
  
}
