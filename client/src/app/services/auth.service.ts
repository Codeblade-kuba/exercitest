import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { SignInForm, SignUpForm } from '../types/forms';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serverRoute = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  signUp(form: Partial<SignUpForm>) {
    return this.http
      .post<{ message: string; token: string; expiresIn: number }>(
        `${this.serverRoute}/user/create`,
        form
      )
      .pipe(
        map((res) => {
          this.setToken(res.token, res.expiresIn);
          return res;
        })
      );
  }

  signIn(formValues: Partial<SignInForm>) {
    return this.http
      .post<{ message: string; token: string; expiresIn: number }>(
        `${this.serverRoute}/user/login`,
        formValues
      )
      .pipe(
        map((res) => {
          this.setToken(res.token, res.expiresIn);
          return res;
        })
      );
  }

  isLoggedIn() {
    const tokenExpiration = this.getTokenExpiration();
    const res = moment().isBefore(tokenExpiration);
    return res;
  }

  signOut() {
    return this.removeToken();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getTokenExpiration() {
    return localStorage.getItem('expires_at');
  }

  setToken(token: string, expirationTime: number) {
    // const expiresAt = moment().add(expirationTime, 'minutes').toISOString();
    const expiresAt = moment().add(12, 'seconds').toISOString();

    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', expiresAt);
  }

  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  getTokenPayload() {
    const token = this.getToken();
    if (!token) return;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  getUserId() {
    return this.getTokenPayload().user.id;
  }

  getUserName() {
    return this.getTokenPayload().user.name;
  }
}
