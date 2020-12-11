import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from "./main.component";
import {HomeComponent} from "./home/home.component";
import {FeildComponent} from "./feild/feild.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {path:'dashboard', component:HomeComponent},
      {path:'feild', component: FeildComponent},
    ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
