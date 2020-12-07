import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuanLyQuyTrinhComponent } from './quan-ly-quy-trinh.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: QuanLyQuyTrinhComponent,
  }, 
];

@NgModule({
  declarations: [QuanLyQuyTrinhComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class QuanLyQuyTrinhModule { }
