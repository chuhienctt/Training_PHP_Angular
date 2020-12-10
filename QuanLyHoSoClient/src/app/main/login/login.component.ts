import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../service/home.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../libs/alert.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  pipe = new DatePipe("en-US");
  listCity = [];
  listDistrict = [];
  listCommune = [];
  style = {};
  submittedRe = false;
  submittedLo = false;
  formRegister: FormGroup;
  formLogin: FormGroup;

  constructor(
    private homeService: HomeService,
    private alertService: AlertService,
    private  router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.homeService.getAddress().subscribe((data: any) => {
      this.listCity = data;
    });

    this.style = {
      width: '100%',
      // 'border-radius': '25px',
      // 'padding-left': '22px',
      // height: '50px',
      boder: '1px solid rgba(51, 51, 51, 0.1);',
      'font-weight': 400,
      'font-family': 'Roboto'
    };

    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      mat_khau: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
    })

    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      mat_khau: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      mat_khau_2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      ho_ten: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      so_dien_thoai: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      dia_chi: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      ngay_sinh: ['', [Validators.required]],
      city: ['', [Validators.required]],
      district: [{value: '', disabled: true}, [Validators.required]],
      commune: [{value: '', disabled: true}, [Validators.required]]
    }, {
      validator: this.confirm_password_validate('mat_khau', 'mat_khau_2')
    })
  }

  confirm_password_validate(pass: string, pass_confirm: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[pass];
      const matchingControl = formGroup.controls[pass_confirm];

      if (matchingControl.errors && !matchingControl.errors.confirm_password) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirm_password: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  getDistrict(val) {
    this.listDistrict = [];
    this.listCommune = [];

    this.listDistrict = this.listCity.filter(d => d.name == val)[0].huyen;
    if (this.listDistrict.length != 0) {
      this.formRegister.controls.district.enable();
    }
  }

  getCommune(val) {
    this.listCommune = [];
    this.listCommune = this.listDistrict.filter(c => c.name == val)[0].xa;
    if (this.listCommune.length != 0) {
      this.formRegister.controls.commune.enable();
    }
  }

  register() {
    let address = [];
    if (this.formRegister.value.dia_chi != null) {
      address.push(this.formRegister.value.dia_chi, this.formRegister.value.city,  this.formRegister.value.district, this.formRegister.value.commune);
    } else {
      address.push(this.formRegister.value.city,  this.formRegister.value.district, this.formRegister.value.commune);
    }

    this.submittedRe = true;
    if(this.formRegister.invalid) {
      return;
    }
    let user = {
      email: this.formRegister.value.email,
      mat_khau: this.formRegister.value.mat_khau,
      ho_ten: this.formRegister.value.ho_ten,
      so_dien_thoai: this.formRegister.value.so_dien_thoai,
      dia_chi: address.join(", "),
      ngay_sinh: this.pipe.transform(this.formRegister.value.ngay_sinh, "yyyy-MM-dd")
    }
    this.homeService.register(user).subscribe((res: any) => {
      this.alertService.success(
        'Đăng ký thành công!',
        true,
        'Đăng nhập ngay!',
        () => {
          this.homeService.login(user).subscribe((res:any) => {
            localStorage.setItem("jwt", JSON.stringify(res.data));
            this.homeService.input(res.data);
            this.router.navigate(["/"]);
          })
        });
    }, err => {
      if (err.status != 1) {
        this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
      }
    });
  }

  login() {
    this.submittedLo = true;
    if(this.formLogin.invalid) {
      return;
    }
    this.homeService.login(this.formLogin.value).subscribe((res:any) => {
      localStorage.setItem("jwt", JSON.stringify(res.data));
      this.homeService.input(res.data);
      this.alertService.success(
        'Đăng nhập thành công!',
        true,
        'Đến trang chủ!',
        () => {
          this.router.navigate(["/"]);
        });
    }, err => {
      if (err.status != 1) {
        this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
      }
    })
  }

}
