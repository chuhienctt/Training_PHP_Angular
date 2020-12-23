import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Er404Component } from './er404/er404.component'
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { QuanLyHoSoModule } from './quan-ly-ho-so/quan-ly-ho-so.module';
import { QuanLyThuTucModule } from './quan-ly-thu-tuc/quan-ly-thu-tuc.module';
import { QuanLyCoQuanModule } from './quan-ly-co-quan/quan-ly-co-quan.module';
import { QuanLyQuyTrinhModule } from './quan-ly-quy-trinh/quan-ly-quy-trinh.module';
import { QuanLyLinhVucModule } from './quan-ly-linh-vuc/quan-ly-linh-vuc.module';
import { QuanLyNguoiDungModule } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.module';
import { QuanLyBuocModule } from './quan-ly-buoc/quan-ly-buoc.module';
import { SharedModule } from './shared/shared.module';
import { Login1Module } from './login1/login1.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { AccordionModule} from 'primeng/accordion';
import {ToastModule} from 'primeng/toast';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './_guards/auth-guards.services';
import { LoginGuard } from './_guards/login-guards';
import { FileUploadModule } from 'primeng/fileupload';
import { ProfileComponent } from './profile/profile.component';
import { ChangepassComponent } from './changepass/changepass.component';

//import { Login1Component } from './login1/login1.component';
//import { Login1Component } from './login1/login1.component';
export function tokenGetter() {
  let user = JSON.parse(localStorage.getItem("jwt"));

  return user ? user.token : null;
}

const routes: Routes = [
  {
    path: 'login1',
    canActivate: [LoginGuard],
    loadChildren: () => import('./login1/login1.module').then(m => m.Login1Module)  
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)  
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)  
  },
  {
    path: 'change-password',
    canActivate: [AuthGuard],
    loadChildren: () => import('./changepass/changepass.module').then(m => m.ChangepassModule)  
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./login/login.module').then(m => m.LoginModule)  
  // },
  {
    path: 'quan-ly-buoc',
    canActivate: [AuthGuard],
    loadChildren: () => import('./quan-ly-buoc/quan-ly-buoc.module').then(m => m.QuanLyBuocModule)  
  },
  {
    path: 'quan-ly-co-quan',
    canActivate: [AuthGuard],
    loadChildren: () => import('./quan-ly-co-quan/quan-ly-co-quan.module').then(m => m.QuanLyCoQuanModule)  
  },
  {
    path: 'quan-ly-ho-so',
    canActivate: [AuthGuard],
    loadChildren: () => import('./quan-ly-ho-so/quan-ly-ho-so.module').then(m => m.QuanLyHoSoModule)  
  },
  {
    path: 'quan-ly-linh-vuc',
    canActivate: [AuthGuard],
    loadChildren: () => import('./quan-ly-linh-vuc/quan-ly-linh-vuc.module').then(m => m.QuanLyLinhVucModule)  
  },
  {
    path: 'quan-ly-nguoi-dung',
    canActivate: [AuthGuard],
    loadChildren: () => import('./quan-ly-nguoi-dung/quan-ly-nguoi-dung.module').then(m => m.QuanLyNguoiDungModule)  
  },
  {
    path: 'quan-ly-quy-trinh',
    canActivate: [AuthGuard],
    loadChildren: () => import('./quan-ly-quy-trinh/quan-ly-quy-trinh.module').then(m => m.QuanLyQuyTrinhModule)  
  },
  {
    path: 'quan-ly-thu-tuc',
    canActivate: [AuthGuard],
    loadChildren: () => import('./quan-ly-thu-tuc/quan-ly-thu-tuc.module').then(m => m.QuanLyThuTucModule)  
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  { path: '**', component:Er404Component}
];
@NgModule({
  declarations: [
    AppComponent,
    Er404Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Login1Module,
    DashboardModule,
    SharedModule,
    QuanLyBuocModule,
    QuanLyHoSoModule,
    QuanLyThuTucModule,
    QuanLyCoQuanModule,
    QuanLyQuyTrinhModule,
    QuanLyLinhVucModule,
    QuanLyNguoiDungModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    ToastModule,
    RouterModule.forRoot(routes),
    CommonModule,
    AccordionModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.domain],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
