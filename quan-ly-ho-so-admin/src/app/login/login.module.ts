import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }, 
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,

    FormsModule,
    //ModalModule.forRoot(),
    RouterModule.forChild(routes),
  ]
})
export class LoginModule { }
