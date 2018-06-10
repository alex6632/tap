import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { ValidationService } from './services/validation.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { ScoresComponent } from './scores/scores.component';
import { ScoreService } from './services/score.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'me', component: GameComponent, canActivate: [AuthGuardService] },
  { path: 'tap', component: ScoresComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    GameComponent,
    ScoresComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthenticationService,
    ValidationService,
    ScoreService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
