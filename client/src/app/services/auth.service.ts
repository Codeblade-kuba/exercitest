import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serverRoute = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  signUp(form: any) {
    return this.http
      .post<{ message: string; token: string }>(
        `${this.serverRoute}/user/create`,
        form
      )
      .subscribe((res) => this.setToken(res.token));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    return localStorage.setItem('token', token);
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
