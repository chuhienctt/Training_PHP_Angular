import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  }, 
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,

    FormsModule,
    //ModalModule.forRoot(),
    RouterModule.forChild(routes),
  ]
})
export class ProfileModule { }
