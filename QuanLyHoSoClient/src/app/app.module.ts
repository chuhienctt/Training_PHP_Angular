import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import { ProcedureComponent } from './main/procedure/procedure.component';
import { DetailComponent } from './main/detail/detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { JwtModule } from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import { MainComponent } from './main/main.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ProcedureComponent,
    DetailComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
    ToastModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.domain],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
