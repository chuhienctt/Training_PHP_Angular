import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../services/home.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../libs/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {DatePipe} from "@angular/common";
import {AddressService} from "../../services/address.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  pipe = new DatePipe("en-US");
  listProvince = [];
  listDistrict = [];
  listCommune = [];
  style = {};
  submittedRe = false;
  submittedLo = false;
  formRegister: FormGroup;
  formLogin: FormGroup;
  title = true;
  returnUrl: string;

  constructor(
    private homeService: HomeService,
    private alertService: AlertService,
    private  router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private addressService: AddressService
  ) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.addressService.getProvince().subscribe((res: any) => {
      this.listProvince = res;
    });

    this.style = {
      width: '100%',
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

  changeTitle(val: boolean) {
    this.title = val;
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

  getDistrict(id) {
    this.listDistrict = [];
    this.listCommune = [];
    this.addressService.getDistrict(id).subscribe((res:any) => {
      this.listDistrict = res;
      if (this.listDistrict.length != 0) {
        this.formRegister.controls.district.enable();
      }
    })
  }

  getCommune(id) {
    this.listCommune = [];
    this.addressService.getCommune(id).subscribe((res:any) => {
      this.listCommune = res;
      if (this.listCommune.length != 0) {
        this.formRegister.controls.commune.enable();
      }
    })
  }

  register() {
    this.submittedRe = true;
    if(this.formRegister.invalid) {
      return;
    }
    let user = {
      email: this.formRegister.value.email,
      mat_khau: this.formRegister.value.mat_khau,
      ho_ten: this.formRegister.value.ho_ten,
      so_dien_thoai: this.formRegister.value.so_dien_thoai,
      dia_chi: this.formRegister.value.dia_chi,
      ward_id: this.formRegister.value.commune,
      ngay_sinh: this.pipe.transform(this.formRegister.value.ngay_sinh, "yyyy-MM-dd")
    }
    this.homeService.register(user).subscribe((res: any) => {
      this.alertService.success(() => {
        this.homeService.login(user).subscribe((res:any) => {
          localStorage.setItem("jwt", JSON.stringify(res.data));
          this.homeService.input(res.data);
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl)
          } else {
            this.router.navigate(['/']);
          }
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
      this.alertService.success(() => {
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl)
          } else {
            this.router.navigate(['/']);
          }
      });
    }, err => {
      console.log(err)
      if (err.status != 1) {
        this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
      }
    })
  }

}
