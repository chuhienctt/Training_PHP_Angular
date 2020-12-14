import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Store, State } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import * as userLogins from '../_action/userAction';
import { UserState } from '../_reduces/user.reducer';
import { getLogin } from '../_reduces/index';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css'],
})
export class Login1Component implements OnInit {
  title = 'Login';
  form: any;
  isCheckLogin: boolean = false;
  dataLogin = [
    {
      id: 1,
      ho_ten: 'NGUYEN THANH HOA',
      email: 'nguyenthanhhoa.com@gmail.com',
      mat_khau: '12345678',
      token: 'TYDAKSDJASLKDJASLKDJASDASD',
    },
    {
      id: 2,
      ho_ten: 'SKIPPERHOA',
      email: 'skipperhoa2013@gmail.com',
      mat_khau: 'hoa123',
      token: 'TYDAKSDJASLKDJASLKDJASDASD',
    },
  ];

  constructor(
    private router: Router,

    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      mat_khau: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    
  }
}

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login1',
//   templateUrl: './login1.component.html',
//   styleUrls: ['./login1.component.css']
// })
// export class Login1Component implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
