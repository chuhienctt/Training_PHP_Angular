import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {MatSelectModule} from '@angular/material/select';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    ToastModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    ReactiveFormsModule,
    MatSelectModule,
    ToastModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    BsDatepickerModule
  ]
})
export class ShareModule { }
