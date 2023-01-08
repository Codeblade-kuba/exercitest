import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() variant: string[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }
}
