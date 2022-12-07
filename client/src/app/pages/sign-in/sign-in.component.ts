import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(private router: Router, private authService: AuthService) {}

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  signIn() {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).add(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
