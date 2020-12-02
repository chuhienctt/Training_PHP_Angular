import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyThuTucComponent } from './quan-ly-thu-tuc.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: QuanLyThuTucComponent,
  }, 
];

@NgModule({
  declarations: [QuanLyThuTucComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class QuanLyThuTucModule { }
