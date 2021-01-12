import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  let user = JSON.parse(localStorage.getItem("jwt"));
  return user ? user.token : null;
}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import {ShareModule} from "./share/share.module";
import {ErrorInterceptor} from "./libs/error.interceptor";
import {SidebarComponent} from "./share/sidebar/sidebar.component";
import { NotFoundComponent } from './auth/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SidebarComponent,
    NotFoundComponent
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
