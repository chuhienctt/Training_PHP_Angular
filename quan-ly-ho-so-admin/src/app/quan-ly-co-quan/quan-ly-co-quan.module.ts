import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyCoQuanComponent } from './quan-ly-co-quan.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModule } from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';

const routes: Routes = [
  {
    path: '',
    component: QuanLyCoQuanComponent,
  }, 
];

@NgModule({
  declarations: [QuanLyCoQuanComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    ModalModule.forRoot(),
    FormsModule,
    CommonModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
    RouterModule.forChild(routes),
  ]
})
export class QuanLyCoQuanModule { }
