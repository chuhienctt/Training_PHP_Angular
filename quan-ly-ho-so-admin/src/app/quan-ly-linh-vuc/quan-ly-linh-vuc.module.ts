import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyLinhVucComponent } from './quan-ly-linh-vuc.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModule } from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';

const routes: Routes = [
  {
    path: '',
    component: QuanLyLinhVucComponent,
  }, 
];

@NgModule({
  declarations: [QuanLyLinhVucComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    ModalModule.forRoot(),
    FormsModule,
    CommonModule,
    DropdownModule,
    PaginatorModule,
    ReactiveFormsModule,
    ToastModule,
    RouterModule.forChild(routes),
  ]
})
export class QuanLyLinhVucModule { }
