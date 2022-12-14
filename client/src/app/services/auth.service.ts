import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SignInForm, SignUpForm } from '../types/forms';
import { Observable } from 'rxjs';

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
      .pipe((res: any) => {
        if (res.token) this.setToken(res.token);
        return res;
      });
  }

  signIn(formValues: Partial<SignInForm>) {
    return this.http
      .post<{ message: string; token: string }>(
        `${this.serverRoute}/user/login`,
        formValues
      )
      .pipe((res: any) => {
        if (res.token) this.setToken(res.token);
        return res;
      });
  }

  // TODO: Description unnecessary
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
