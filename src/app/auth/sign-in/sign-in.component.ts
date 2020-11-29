import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'app/data/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public signedIn: Observable<any>;

  emailField = new FormControl('');
  passwordField = new FormControl('')

  constructor(private service: AuthService, public auth: AngularFireAuth) {
    this.signedIn = new Observable((subscriber) => {
      this.auth.onAuthStateChanged(subscriber);
    })
  }

  ngOnInit(): void {
  }

  submitHandler() {
    this.service.login(this.emailField.value, this.passwordField.value)
  }

}
