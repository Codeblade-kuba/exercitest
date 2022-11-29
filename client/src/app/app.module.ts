import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomepageComponent, SignUpComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
