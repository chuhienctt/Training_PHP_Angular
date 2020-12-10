import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  exports: [
    ReactiveFormsModule,
    ToastModule,
    CommonModule
  ]
})
export class ShareModule { }
