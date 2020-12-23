import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangepassComponent} from './changepass.component'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


const routes: Routes = [
  {
    path: '',
    component: ChangepassComponent,
  }, 
];

@NgModule({
  declarations: [ChangepassComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    //ModalModule.forRoot(),
    RouterModule.forChild(routes),
  ]
})
export class ChangepassModule { }
