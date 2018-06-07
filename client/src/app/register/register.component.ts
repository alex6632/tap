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
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) { }

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/');
    }, (err) => {
      console.log(err);
    });
  }
}