import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { ValidationService } from '../services/validation.service';
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

  constructor(private auth: AuthenticationService, private validation: ValidationService, private router: Router) { }

  register() {

    let error = false;

    // Test email
    error = this.validation.isEmpty(this.credentials.email);
    if(error) this.errors.email = "Email is needed";
    // Test password
    error = this.validation.isEmpty(this.credentials.password) ? true: error;
    if( this.validation.isEmpty(this.credentials.password)) this.errors.password = 'Password is needed';
    // Test first name
    error = this.validation.isEmpty(this.credentials.firstName) ? true: error;
    if( this.validation.isEmpty(this.credentials.firstName)) this.errors.firstName = 'First name is needed';
    // Test last name
    error = this.validation.isEmpty(this.credentials.lastName) ? true: error;
    if( this.validation.isEmpty(this.credentials.lastName)) this.errors.lastName = 'Last name is needed';
    // Test cgu
    error = this.validation.isChecked(this.credentials.cgu) ? true : error;
    if( this.validation.isChecked(this.credentials.cgu)) this.errors.cgu = 'You must accept terms and conditions';
 
    if (!error) {
      this.auth.register(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/me');
      }, (err) => {
        console.log(err);
      });
    }
  }

  CheckField(field, value) {
    if(!this.validation.isEmpty(value)) this.errors[field] = ""
  }
}