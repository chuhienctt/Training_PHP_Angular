import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {ShareModule} from "../share/share.module";
import {HomeComponent} from "./home/home.component";
import { FeildComponent } from './feild/feild.component';
import { OrganComponent } from './organ/organ.component';
import {PaginatorModule} from 'primeng/paginator';
import { ProfileComponent } from './profile/profile.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { DistrictComponent } from './address/district/district.component';
import { CommuneComponent } from './address/commune/commune.component';
import { GroupComponent } from './user/group/group.component';
import { AccountComponent } from './user/account/account.component';
import { CityComponent } from './address/city/city.component';

@NgModule({
  declarations: [
    HomeComponent,
    FeildComponent,
    OrganComponent,
    ProfileComponent,
    ChangepassComponent,
    ProcedureComponent,
    DistrictComponent,
    CommuneComponent,
    GroupComponent,
    AccountComponent,
    CityComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    MainRoutingModule,
    PaginatorModule,
  ]
})
export class MainModule { }
