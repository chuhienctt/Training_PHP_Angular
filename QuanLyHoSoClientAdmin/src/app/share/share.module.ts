import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    CKEditorModule,
    ButtonModule
  ],
  exports: [
    ReactiveFormsModule,
    ToastModule,
    CommonModule,
    TableModule,
    CKEditorModule,
    ButtonModule
  ]
})
export class ShareModule { }
