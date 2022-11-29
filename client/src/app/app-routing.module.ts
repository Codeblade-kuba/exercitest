import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
