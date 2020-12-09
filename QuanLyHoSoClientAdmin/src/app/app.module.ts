import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from 'primeng/toast';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from './share/header/header.component';
import {FieldComponent} from './feild/field.component';
import {TableModule} from 'primeng/table';
import { LoginComponent } from './login/login.component';
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FieldComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.domain],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
