import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyHoSoComponent } from './quan-ly-ho-so.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: QuanLyHoSoComponent,
  }, 
];

@NgModule({
  declarations: [QuanLyHoSoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class QuanLyHoSoModule { }
