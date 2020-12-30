import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from "./main.component";
import {HomeComponent} from "./home/home.component";
import {FeildComponent} from "./feild/feild.component";
import {OrganComponent} from "./organ/organ.component";
import {ProfileComponent} from "./profile/profile.component";
import {ChangepassComponent} from "./changepass/changepass.component";
import {ProcedureComponent} from "./procedure/procedure.component";
import {DistrictComponent} from "./address/district/district.component";
import {CommuneComponent} from "./address/commune/commune.component";
import {GroupComponent} from "./user/group/group.component";
import {AccountComponent} from "./user/account/account.component";
import {CityComponent} from "./address/city/city.component";

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
      {path: 'dashboard', component:HomeComponent},
      {path: 'procedure', component: ProcedureComponent},
      {path: 'feild', component: FeildComponent},
      {path: 'organ', component: OrganComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'change-password', component: ChangepassComponent},
      {
        path: 'user',
        children: [
          {path: 'account', component: AccountComponent},
          {path: 'group', component: GroupComponent}
        ]
      },
      {
        path: 'address',
        children: [
          {path: 'city', component:CityComponent},
          {path: 'district/:id', component: DistrictComponent},
          {path: 'commune/:id', component: CommuneComponent}
        ]
      },
    ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
