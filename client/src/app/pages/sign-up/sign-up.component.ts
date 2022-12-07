import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface testFn {
  (control: AbstractControl<any, any>): ValidationErrors | null;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(private router: Router, private authService: AuthService) {}

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  signUpForm = new FormGroup(
    {
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
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{0,}$/),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      privacyPolicy: new FormControl(false, Validators.requiredTrue),
    },
    this.checkPasswords
  );

  get formControls() {
    return this.signUpForm.controls;
  }

  signUp() {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value).add(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
