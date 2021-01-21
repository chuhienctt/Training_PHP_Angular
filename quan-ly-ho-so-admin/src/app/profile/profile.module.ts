import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

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
    FileUploadModule,
    ModalModule.forRoot(),
    FormsModule,
    CommonModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
    RouterModule.forChild(routes),
  ]
})
export class ProfileModule { }
