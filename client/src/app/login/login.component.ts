import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isEmptyRegex = /^\s*$/
  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  errors = {
    email: '',
    password: '',
    credentials: '',
  }

  constructor(private auth: AuthenticationService, private router: Router) { }

  login() {

    let error = false;

    error = this.isEmptyRegex.test(this.credentials.email)
    if(error) this.errors.email = "Email is needed";
    error = this.isEmptyRegex.test(this.credentials.password) ? true: error
    if( this.isEmptyRegex.test(this.credentials.password)) this.errors.password = 'Password is needed';
    
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
    if(!this.isEmptyRegex.test(value)) this.errors[field] = ""
  }
}
