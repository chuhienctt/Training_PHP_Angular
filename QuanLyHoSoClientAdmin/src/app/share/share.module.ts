import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule
  ],
  exports: [
    ReactiveFormsModule,
    ToastModule,
    CommonModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class ShareModule { }
