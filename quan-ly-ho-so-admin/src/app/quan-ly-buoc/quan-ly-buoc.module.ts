import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyBuocComponent } from './quan-ly-buoc.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: QuanLyBuocComponent,
  }, 
];

@NgModule({
  declarations: [QuanLyBuocComponent],
  imports: [
    CommonModule,

    FormsModule,
    //ModalModule.forRoot(),
    RouterModule.forChild(routes),
  ]
})
export class QuanLyBuocModule { }
