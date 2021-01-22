import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './main/home/home.component';
import {LoginComponent} from './main/login/login.component';
import {AuthGuard} from "./guards/auth.guard";
import {ProfileComponent} from "./main/profile/profile.component";
import { RegisterComponent } from './main/register/register.component';
import { IsloginGuard } from './guards/islogin.guard';
import { ChangepassComponent } from './main/changepass/changepass.component';
import {ListComponent} from "./main/list/list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsloginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [IsloginGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    component: ChangepassComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, IsloginGuard]
})
export class AppRoutingModule { }
