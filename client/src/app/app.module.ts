import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HeadingComponent } from './components/heading/heading.component';
import { InputComponent } from './components/input/input.component';
import { AcceptanceComponent } from './components/acceptance/acceptance.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputNoticeComponent } from './components/input-notice/input-notice.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    SignUpComponent,
    HeadingComponent,
    InputComponent,
    AcceptanceComponent,
    ButtonComponent,
    InputNoticeComponent,
    DashboardComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
