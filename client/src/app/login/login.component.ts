import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { ValidationService } from '../services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  errors = {
    email: '',
    password: '',
    credentials: '',
  }

  constructor(private auth: AuthenticationService, private validation: ValidationService, private router: Router) { }

  login() {

    let error = false;
    let errorType = '';

    errorType = this.validation.isEmail(this.credentials.email);
    if (errorType === 'empty') this.errors.email = "Email is needed";
    if (errorType === 'format') this.errors.email = "Email format is incorrect";

    error = this.validation.isEmpty(this.credentials.password) ? true: error
    if( this.validation.isEmpty(this.credentials.password)) this.errors.password = 'Password is needed';
    
    if (!error) {
      this.auth.login (this.credentials).subscribe(() => {
        this.router.navigateByUrl('/me');
      }, (err) => {
        console.error(err);
        this.errors.credentials = 'Unknown user';
      });
    }
  }

  CheckField(field, value) {
    if (field === 'email') {
      if (this.validation.isEmail(value) !== 'empty' || this.validation.isEmail(value) !== 'format') {
        this.errors.email = "";
      }
    } else {
      if(!this.validation.isEmpty(value)) this.errors[field] = "";
    }
  }
}
