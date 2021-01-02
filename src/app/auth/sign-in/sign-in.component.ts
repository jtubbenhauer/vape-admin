import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'app/data/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public signedIn: Observable<any>;

  emailField = new FormControl('');
  passwordField = new FormControl('')
  errorMessage: string;

  constructor(private service: AuthService, public auth: AngularFireAuth, private router: Router) {
    this.signedIn = new Observable((subscriber) => {
      this.auth.onAuthStateChanged(subscriber);
    })
  }

  ngOnInit(): void {
  }

  submitHandler() {
    this.service.login(this.emailField.value, this.passwordField.value).then(value => {
      localStorage.setItem('user', JSON.stringify(value.user))
      this.router.navigate(['admin'])
    }).catch(err => {
      this.errorMessage = err;
      console.log(err);
      
    })

    
  }

}
