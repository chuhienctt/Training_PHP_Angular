import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './main/home/home.component';
import {LoginComponent} from './main/login/login.component';
import {ProcedureComponent} from './main/procedure/procedure.component';
import {DetailComponent} from './main/detail/detail.component';
import {AuthGuard} from "./guards/auth.guard";
import {ProfileComponent} from "./main/profile/profile.component";
import { RegisterComponent } from './main/register/register.component';
import { IsloginGuard } from './guards/islogin.guard';
import { ChangepassComponent } from './main/changepass/changepass.component';

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
    path: 'procedure',
    component: ProcedureComponent
  },
  {
    path: 'detail',
    component: DetailComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, IsloginGuard]
})
export class AppRoutingModule { }
