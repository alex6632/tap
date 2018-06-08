import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  exp: number;
  iat: number;
}

export interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  cgu?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      // Get the second part of JWT 
      payload = token.split('.')[1];
      // Decode string
      payload = window.atob(payload);
      // return json
      return JSON.parse(payload);
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    }
    return false;
  }

  private request(method: 'post' | 'get', type: 'login' | 'register' | 'me' | 'tap', user?: TokenPayload): Observable<any> {
    let base;

    console.log('METHOD ->',method)
    console.log('TYPE ->',type)
    console.log('USER ->',user)

    if (method === 'post') {
      console.log('USER ->',user)
      base = this.http.post(`/api/${type}`, user);
    } else {
      /*const headers = new Headers({
        'Authorization': `Bearer ${this.getToken()}`
      });*/
      //base = this.http.get(`/api/${type}`, { headers: headers });
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    //return;

    /* Delete return below after debug */

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public register(user: TokenPayload):Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload):Observable<any> {
    return this.request('post', 'login', user)
  }

  public me():Observable<any> {
    return this.request('get', 'me');
  }

  public tap():Observable<any> {
    return this.request('get', 'tap');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }



}
