import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SignInForm, SignUpForm } from '../types/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serverRoute = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  signUp(form: Partial<SignUpForm>) {
    return this.http
      .post<{ message: string; token: string }>(
        `${this.serverRoute}/user/create`,
        form
      )
      .subscribe((res) => this.setToken(res.token));
  }

  signIn(form: Partial<SignInForm>) {
    return this.http
      .post<{ message: string; token: string }>(
        `${this.serverRoute}/user/login`,
        form
      )
      .subscribe((res) => this.setToken(res.token));
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  signOut() {
    return this.removeToken();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    return localStorage.setItem('token', token);
  }

  removeToken() {
    return localStorage.removeItem('token');
  }

  getTokenPayload(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  getUserId() {
    const token = this.getToken() || false;
    if (!token) return;

    const payload = this.getTokenPayload(token);
    return payload.user.id;
  }
}
