import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {MatSelectModule} from '@angular/material/select';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {GetImagePipe} from "../libs/get.image.pipe";
import {EditorModule} from 'primeng/editor';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    GetImagePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    ToastModule,
    BsDatepickerModule.forRoot(),
    CKEditorModule
  ],
  exports: [
    ReactiveFormsModule,
    MatSelectModule,
    ToastModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    BsDatepickerModule,
    GetImagePipe,
    CKEditorModule
  ]
})
export class ShareModule { }
