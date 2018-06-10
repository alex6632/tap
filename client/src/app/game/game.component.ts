import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../services/authentication.service';
import { ScoreService, ScorePayload } from '../services/score.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: './game.component.html',
})
export class GameComponent {

  add: ScorePayload = {
    score: 0,
    date: new Date(),
    userId: '',
  };
  started = false;
  score = 0;
  time = 10;
  isOdd = true;
  interval = null;

  constructor(private auth: AuthenticationService, private scoreS: ScoreService, private http: HttpClient, private router: Router) { }

  decrease() {
    console.log('TIME -> ',this.time);
    this.time--;
    if (this.time === 0) {
      this.finish();
    }
  }

  tap() {

    if (!this.started) {

      // Run interval
      const self = this;
      this.interval = setInterval(this.decrease.bind(this), 1000);

      // Run progress bar animation
      this.animate();

      // Update started
      this.started = true;
    }

    if (this.time > 0) {
      this.score++;
      this.isOdd = !this.isOdd;
      console.log(this.score)
    }
  }

  animate() {
    document.querySelector('body').style.cssText = "--time: " + this.time * 1000 + 'ms';
    document.getElementById('progress').className += " start";
  }

  finish() {
    clearInterval(this.interval);
    this.add.score = this.score;
    this.add.userId = this.auth.getUserDetails()._id;
    console.log('add score ->',this.add);

    this.scoreS.addScore(this.add).subscribe(() => {
      this.router.navigateByUrl('/tap');
    }, (err) => {
      console.log(err);
    });
  }

}