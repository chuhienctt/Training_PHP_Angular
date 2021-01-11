import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {MatSelectModule} from '@angular/material/select';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {GetImagePipe} from "../libs/get.image.pipe";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {TableModule} from "primeng/table";
import {PickListModule} from "primeng/picklist";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

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
    CKEditorModule,
    TableModule,
    PickListModule,
    BsDatepickerModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    ReactiveFormsModule,
    MatSelectModule,
    ToastModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    GetImagePipe,
    CKEditorModule,
    BsDatepickerModule,
    TableModule,
    PickListModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class ShareModule { }
