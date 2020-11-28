import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import firebase from 'firebase/app'

//https://dev.to/dobis32/user-authentication-with-angular-angularfire-3eja
//https://medium.com/javascript-in-plain-english/how-to-add-firebase-authentication-to-pwa-or-angular-project-using-angularfire-83a8f61d367c

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(value => {
      console.log('success', value);
    })
    .catch(err => {
      console.log(err.message);
    })
  };

  
}
