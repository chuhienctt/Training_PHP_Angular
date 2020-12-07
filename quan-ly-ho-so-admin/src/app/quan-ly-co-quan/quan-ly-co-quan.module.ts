import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyCoQuanComponent } from './quan-ly-co-quan.component';
import { RouterModule, Routes } from '@angular/router';


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
    RouterModule.forChild(routes),
  ]
})
export class QuanLyCoQuanModule { }
