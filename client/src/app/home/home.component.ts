import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent {
  showLogin = true;
  showRegister = false;

  toggleShowLogin() {
    this.showLogin = !this.showLogin;
    this.showRegister = false;
  }

  toggleShowRegister() {
    this.showRegister = !this.showRegister;
    this.showLogin = false;
  }
}