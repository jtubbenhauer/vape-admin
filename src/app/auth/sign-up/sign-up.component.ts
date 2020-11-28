import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from 'app/data/service/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email: string;
  password: string;

  emailField = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordField = new FormControl('');

  matcher = new MyErrorStateMatcher;

  constructor(public service: AuthService) { }

  ngOnInit(): void {
  }

  signup() {
    this.service.signup(this.email, this.password);
    this.email = this.password = '';
  }

}
