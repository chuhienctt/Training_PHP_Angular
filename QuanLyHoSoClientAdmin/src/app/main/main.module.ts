import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {ShareModule} from "../share/share.module";
import {HomeComponent} from "./home/home.component";
import { FeildComponent } from './feild/feild.component';


@NgModule({
  declarations: [
    HomeComponent,
    FeildComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    MainRoutingModule
  ]
})
export class MainModule { }
