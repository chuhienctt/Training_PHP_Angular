import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {IsLoginGuard} from "./guards/is-login.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import("./main/main.module").then(m => m.MainModule)
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [IsLoginGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard, IsLoginGuard]
})
export class AppRoutingModule {
}
