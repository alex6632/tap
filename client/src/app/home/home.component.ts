import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent {
  showLogin = true;
  showRegister = false;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) this.router.navigateByUrl('/me');
  }

  toggleShowLogin() {
    this.showLogin = !this.showLogin;
    this.showRegister = false;
  }

  toggleShowRegister() {
    this.showRegister = !this.showRegister;
    this.showLogin = false;
  }
}