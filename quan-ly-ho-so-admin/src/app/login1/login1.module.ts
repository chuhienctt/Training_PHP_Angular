import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Login1Component} from './login1.component'
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';


const routes: Routes = [
  {
    path: '',
    component: Login1Component,
  }, 
];

@NgModule({
  declarations: [Login1Component],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    RouterModule.forChild(routes),
  ]
})
export class Login1Module { }
