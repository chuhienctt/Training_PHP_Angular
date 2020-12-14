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
import { LoginModule } from './login/login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { AccordionModule} from 'primeng/accordion';
import { reducers } from './_reduces/index';
//import { Login1Component } from './login1/login1.component';
//import { Login1Component } from './login1/login1.component';

const routes: Routes = [
  {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)  
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./login/login.module').then(m => m.LoginModule)  
  // },
  {
    path: 'login1',
    loadChildren: () => import('./login1/login1.module').then(m => m.Login1Module)  
  },
  {
    path: 'quan-ly-buoc',
    loadChildren: () => import('./quan-ly-buoc/quan-ly-buoc.module').then(m => m.QuanLyBuocModule)  
  },
  {
    path: 'quan-ly-co-quan',
    loadChildren: () => import('./quan-ly-co-quan/quan-ly-co-quan.module').then(m => m.QuanLyCoQuanModule)  
  },
  {
    path: 'quan-ly-ho-so',
    loadChildren: () => import('./quan-ly-ho-so/quan-ly-ho-so.module').then(m => m.QuanLyHoSoModule)  
  },
  {
    path: 'quan-ly-linh-vuc',
    loadChildren: () => import('./quan-ly-linh-vuc/quan-ly-linh-vuc.module').then(m => m.QuanLyLinhVucModule)  
  },
  {
    path: 'quan-ly-nguoi-dung',
    loadChildren: () => import('./quan-ly-nguoi-dung/quan-ly-nguoi-dung.module').then(m => m.QuanLyNguoiDungModule)  
  },
  {
    path: 'quan-ly-quy-trinh',
    loadChildren: () => import('./quan-ly-quy-trinh/quan-ly-quy-trinh.module').then(m => m.QuanLyQuyTrinhModule)  
  },
  {
    path: 'quan-ly-thu-tuc',
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
    LoginModule,
    RouterModule.forRoot(routes),
    CommonModule,
    AccordionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
