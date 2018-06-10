import { Component } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  templateUrl: './scores.component.html',
})
export class ScoresComponent {

  scores = null;

  constructor(public auth: AuthenticationService, public score: ScoreService) { }

  ngOnInit() {
    this.score.getScores().subscribe(scores => {
      this.scores = scores.data;
      //console.log(this.scores);
      console.log(this.scores);
    }, (err) => {
      console.error(err);
    });
  }
}