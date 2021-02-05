import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import { MenuComponent } from './share/menu/menu.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { JwtModule } from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import { ProfileComponent } from './main/profile/profile.component';
import {FileUploadModule} from "primeng/fileupload";
import { RegisterComponent } from './main/register/register.component';
import { GetImagePipe } from './libs/get.image.pipe';
import { NiceSelectModule } from "ng-nice-select";
import { ChangepassComponent } from './main/changepass/changepass.component';
import { ListComponent } from './main/list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorInterceptor } from './libs/error.interceptor';
import { DetailComponent } from './main/detail/detail.component';
import {TabViewModule} from 'primeng/tabview';
import {PanelModule} from 'primeng/panel';
import { StepsModule } from 'primeng/steps';
import {SendProfileComponent} from "./main/send-profile/send-profile.component";
import { HistoryComponent } from './main/history/history.component';
import { HistoryDetailComponent } from './main/history-detail/history-detail.component';
import { SearchProfileComponent } from './main/search-profile/search-profile.component';

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
    ProfileComponent,
    RegisterComponent,
    ChangepassComponent,
    ListComponent,
    DetailComponent,
    SendProfileComponent,
    HistoryComponent,
    HistoryDetailComponent,
    SearchProfileComponent
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
    FileUploadModule,
    NgbModule,
    TabViewModule,
    PanelModule,
    StepsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
