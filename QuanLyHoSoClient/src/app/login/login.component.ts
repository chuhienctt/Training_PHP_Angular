import {Component, OnInit} from '@angular/core';
import {HomeService} from '../service/home.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from "../libs/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  listCity = [];
  listDistrict = [];
  listCommune = [];
  city: string;
  district: string;
  commune: string;
  style = {};
  value: string;
  formRegister: FormGroup;

  constructor(
    private homeService: HomeService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.homeService.getAddress().subscribe((data: any) => {
      this.listCity = data;
    });

    this.style = {
      width: '100%',
      'border-radius': '25px',
      'padding-left': '22px',
      height: '50px',
      boder: '1px solid rgba(51, 51, 51, 0.1);',
      'font-weight': 400,
      'font-family': 'Roboto'
    };

    this.formRegister = new FormGroup({
      tai_khoan: new FormControl('', [
        Validators.required
      ]),
      mat_khau: new FormControl('', [
        Validators.required
      ]),
      ho_ten: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      so_dien_thoai: new FormControl('', [
        Validators.required
      ]),
      dia_chi: new FormControl('', [
        Validators.required
      ]),
      ngay_sinh: new FormControl('', [
        Validators.required
      ])
    });
  }

  getDistrict(name) {
    this.city = name;
    this.listDistrict = [];
    this.listCommune = [];
    for (let i = 0; i < this.listCity.length; i++) {
      if (this.listCity[i].name === name) {
        this.listDistrict = this.listCity[i].huyen;
      }
    }
  }

  getCommune(name) {
    this.district = name;
    this.listCommune = [];
    for (let i = 0; i < this.listDistrict.length; i++) {
      if (this.listDistrict[i].name === name) {
        this.listCommune = this.listDistrict[i].xa;
      }
    }
  }

  getNameCommune(name) {
    this.commune = name;
  }

  register() {
    let user = {
      tai_khoan: this.formRegister.value.tai_khoan,
      mat_khau: this.formRegister.value.mat_khau,
      ho_ten: this.formRegister.value.ho_ten,
      email: this.formRegister.value.email,
      so_dien_thoai: this.formRegister.value.so_dien_thoai,
      dia_chi: this.formRegister.value.dia_chi + "," + this.commune + "," + this.district + "," + this.city,
      ngay_sinh: this.formRegister.value.ngay_sinh.toISOString()
    }
    this.homeService.register(user).subscribe((data: any) => {
      this.alertService.success(
        'Đăng ký thành công!',
        true,
        'Đăng nhập ngay!',
        () => {
        })
    }, err => {
      console.log(err)
    });
  }

}
