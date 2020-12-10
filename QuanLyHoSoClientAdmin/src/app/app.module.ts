import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import {environment} from "../environments/environment";
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import {HeaderComponent} from "./share/header/header.component";
import {ShareModule} from "./share/share.module";
import {FooterComponent} from "./share/footer/footer.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ShareModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.domain],
        blacklistedRoutes: []
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
