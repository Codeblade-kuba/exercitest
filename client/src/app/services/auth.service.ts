import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serverRoute = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  signUp(form: any) {
    this.http
      .post<any>(`${this.serverRoute}/user/sign-up`, form)
      .subscribe((res) => {
        alert('Signup Successfull');
      });
  }
}
