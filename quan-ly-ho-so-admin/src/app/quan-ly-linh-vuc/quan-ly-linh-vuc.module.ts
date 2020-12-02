import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyLinhVucComponent } from './quan-ly-linh-vuc.component';
import { RouterModule, Routes } from '@angular/router';


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
    RouterModule.forChild(routes),
  ]
})
export class QuanLyLinhVucModule { }
