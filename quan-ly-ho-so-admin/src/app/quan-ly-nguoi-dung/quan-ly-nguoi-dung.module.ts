import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyNguoiDungComponent } from './quan-ly-nguoi-dung.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: QuanLyNguoiDungComponent,
  }, 
];

@NgModule({
  declarations: [QuanLyNguoiDungComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class QuanLyNguoiDungModule { }
