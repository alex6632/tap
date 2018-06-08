import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cgu: false,
  };
  errors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cgu: '',
  }

  constructor(private auth: AuthenticationService, private router: Router) { }

  register() {

    let error = false;

    if (this.credentials.firstName === '' || this.credentials.lastName === '' || this.credentials.email === '' || this.credentials.password === '' || this.credentials.cgu === false) {
      error = true;
    }
    if (this.credentials.firstName === '') {
      this.errors.firstName = "First name is needed";
    }
    if (this.credentials.lastName === '') {
      this.errors.lastName = 'Last name is needed';
    }
    if (this.credentials.email === '') {
      this.errors.email = 'Email is needed';
    }
    if (this.credentials.password === '') {
      this.errors.password = 'Password is needed';
    }
    if (this.credentials.cgu === false) {
      this.errors.cgu = 'You must accept terms and conditions';
    }

    if (!error) {
      this.auth.register(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/me');
      }, (err) => {
        console.log(err);
      });
    }
  }
}