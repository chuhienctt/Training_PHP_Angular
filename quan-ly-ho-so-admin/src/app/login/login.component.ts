// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
// import { Store, State } from '@ngrx/store';
// import { Observable, from } from 'rxjs';
// import { User } from '../_models/user';
// import * as userLogins from '../_action/userAction';
// import { UserState, getLogin } from '../_reduces';
// import { Router, ActivatedRoute } from '@angular/router';
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   title = 'Login';
//   profileForm = new FormGroup({
//     email: new FormControl(''),
//     mat_khau: new FormControl(''),
//   });
//   isCheckLogin: boolean = false;
//   dataLogin = [
//     {
//       id: 1,
//       name: 'NGUYEN THANH HOA',
//       email: 'nguyenthanhhoa.com@gmail.com',
//       password: '12345678',
//       remember_token: 'TYDAKSDJASLKDJASLKDJASDASD',
//     },
//     {
//       id: 2,
//       name: 'SKIPPERHOA',
//       email: 'skipperhoa2013@gmail.com',
//       password: 'hoa123',
//       remember_token: 'TYDAKSDJASLKDJASLKDJASDASD',
//     },
//   ];

//   constructor(private _store: Store<UserState>, private router: Router) {}
//     ngOnInit(): void {
//         throw new Error('Method not implemented.');
//     }
//   onSubmit() {
//     //  console.warn(this.profileForm.value['email']);
//     this.dataLogin.filter((item) => {
//       if (
//         item.email == this.profileForm.value['email'] &&
//         item.password == this.profileForm.value['password']
//       ) {
//         this.isCheckLogin = true;
//         this._store.dispatch(
//           new userLogins.CheckLoginAction({
//             id: item.id,
//             ho_ten: item.name,
//             email: item.email,
//             mat_khau: item.password,
//             token: item.remember_token,
//           })
//         );
//       }
//     });
//     if (this.isCheckLogin) {
//       console.log('Success login');
//       this.router.navigate(['/detail']);
//     } else {
//       console.log('Fail login');
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
@Component({
      selector: 'app-login',
      templateUrl: './login.component.html',
      styleUrls: ['./login.component.css'],
    })
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
