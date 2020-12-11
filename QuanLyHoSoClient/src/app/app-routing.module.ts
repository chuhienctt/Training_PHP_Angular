import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './main/home/home.component';
import {LoginComponent} from './main/login/login.component';
import {ProcedureComponent} from './main/procedure/procedure.component';
import {DetailComponent} from './main/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'procedure', component: ProcedureComponent},
  {path: 'detail', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
