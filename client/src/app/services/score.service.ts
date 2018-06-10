import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export interface ScorePayload {
  score: Number;
  date: Date;
  userId: String
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) { }

  private request(method: 'post'|'get', type: 'scores'|'score', score?: ScorePayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, score, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
    } else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
    }

    const request = base.pipe(
      map((data) => {
        return data;
      })
    );
    return request;
  }

  public addScore(score: ScorePayload): Observable<any> {
    return this.request('post', 'score', score);
  }

  public getScores(): Observable<any> {
    return this.request('get', 'scores');
  }
  
}
