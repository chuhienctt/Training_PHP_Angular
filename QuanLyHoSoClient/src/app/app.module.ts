import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import { MenuComponent } from './share/menu/menu.component';
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
import { ProfileComponent } from './main/profile/profile.component';
import {FileUploadModule} from "primeng/fileupload";
import { RegisterComponent } from './main/register/register.component';
import { GetImagePipe } from './libs/get.image.pipe';
import { NiceSelectModule } from "ng-nice-select";
import { ChangepassComponent } from './main/changepass/changepass.component';

export function tokenGetter() {
  let user = JSON.parse(localStorage.getItem("jwt"));
  return user ? user.token : null;
}

@NgModule({
  declarations: [
    GetImagePipe,
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ProcedureComponent,
    DetailComponent,
    MainComponent,
    ProfileComponent,
    RegisterComponent,
    ChangepassComponent
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
    NiceSelectModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.domain],
        blacklistedRoutes: []
      }
    }),
    FileUploadModule
  ],
  providers: [],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
