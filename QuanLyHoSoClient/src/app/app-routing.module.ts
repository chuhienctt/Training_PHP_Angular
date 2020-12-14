import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './main/home/home.component';
import {LoginComponent} from './main/login/login.component';
import {ProcedureComponent} from './main/procedure/procedure.component';
import {DetailComponent} from './main/detail/detail.component';
import {AuthGuard} from "./guards/auth.guard";
import {IsloginGuard} from "./guards/islogin.guard";
import {ProfileComponent} from "./main/profile/profile.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: 'home', component: HomeComponent},
  {
    path: 'login',
    canActivate: [IsloginGuard],
    component: LoginComponent
  },
  {path: 'procedure', component: ProcedureComponent},
  {path: 'detail', component: DetailComponent},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, IsloginGuard]
})
export class AppRoutingModule { }
