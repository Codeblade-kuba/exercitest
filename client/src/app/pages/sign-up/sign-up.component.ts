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
  constructor(private router: Router, private authService: AuthService) {}

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordconfirmed: true };
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
        this.checkPasswordPattern()
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      privacyPolicy: new FormControl(false, Validators.requiredTrue),
    },
    this.checkPasswords
  );

  checkPasswordPattern(): ValidatorFn {  
    return (control: AbstractControl): { [key: string]: any } | null =>  
        control.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{0,}$/) ? null : { passwordpattern: true };
}


  get formControls() {
    return this.signUpForm.controls;
  }

  signUp() {
    this.signUpForm.markAllAsTouched()
    Object.keys(this.formControls).forEach(field => { 
      const control = this.signUpForm.get(field);
      console.log(control)
      control?.setValue('test');
    });
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value).add(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
