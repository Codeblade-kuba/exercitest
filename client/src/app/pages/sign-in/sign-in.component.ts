import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  formError: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get formControls() {
    return this.signInForm.controls;
  }

  signIn() {
    if (this.signInForm.valid) {
      this.authService
        .signIn(this.signInForm.value)
        .subscribe({ complete: this.signInSuccess, error: this.signInFailed });
    }
  }

  signInSuccess() {
    this.router.navigate(['/dashboard']);
  }

  signInFailed = (res: Response) => {
    switch (res.status) {
      case 401:
        this.setFormError('Invalid email or password');
        break;
      default:
        break;
    }
  };

  setFormError(error: string) {
    this.formError = error;
  }
}
