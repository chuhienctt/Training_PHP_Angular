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
import { UserComponent } from './user/user.component';
import { AddressComponent } from './address/address.component';
import { ProcedureComponent } from './procedure/procedure.component';

@NgModule({
  declarations: [
    HomeComponent,
    FeildComponent,
    OrganComponent,
    ProfileComponent,
    ChangepassComponent,
    UserComponent,
    AddressComponent,
    ProcedureComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    MainRoutingModule,
    PaginatorModule,
  ]
})
export class MainModule { }
