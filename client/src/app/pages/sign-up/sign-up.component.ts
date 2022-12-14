import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  formError: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  signUpForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(24),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      this.checkPasswordPattern(),
      this.matchValidator('confirmPassword', true),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.matchValidator('password'),
    ]),
    privacyPolicy: new FormControl(false, Validators.requiredTrue),
  });

  checkPasswordPattern(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      return control.value.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{0,}$/
      )
        ? null
        : { passwordpattern: true };
    };
  }

  matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value === (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }

  get formControls() {
    return this.signUpForm.controls;
  }

  signUp() {
    this.signUpForm.markAllAsTouched();

    if (this.signUpForm.valid) {
      this.authService
        .signUp(this.signUpForm.value)
        .subscribe({ complete: this.signUpSuccess, error: this.signUpFailed });
    }
  }

  signUpSuccess() {
    this.router.navigate(['/dashboard']);
  }

  signUpFailed = (res: Response) => {
    switch (res.status) {
      case 409:
        this.setFormError('User with given email already exists');
        break;
      default:
        this.setFormError('Something went wrong');
        break;
    }
    this.signUpForm.reset();
  };

  setFormError(error: string) {
    this.formError = error;
  }
}
