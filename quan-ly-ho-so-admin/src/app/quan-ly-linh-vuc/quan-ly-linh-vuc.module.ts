import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyLinhVucComponent } from './quan-ly-linh-vuc.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

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
    ModalModule.forRoot(),
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class QuanLyLinhVucModule { }
