import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
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

  constructor(private auth: AuthenticationService, private router: Router) { }

  login() {

    let error = true;

    /*this.errors = {
      email: '',
      password: '',
      credentials: ''
    };*/

    console.log('email',this.credentials.email)
    console.log('password',this.credentials.password)

    if (this.credentials.email === '' || this.credentials.password === '') {
      error = true;
      console.log('error')
    }
    if (this.credentials.email === '') {
      this.errors.email = "Email is needed";
    }
    if (this.credentials.password === '') {
      this.errors.password = 'Password is needed';
    }
    
    
    if (!error) {
      console.log('cocou')
      this.auth.login (this.credentials).subscribe(() => {
        this.router.navigateByUrl('/me');
      }, (err) => {
        console.error(err);
        // this.errors.credentials = 'Unknown user';
      });
    }
  }
}
