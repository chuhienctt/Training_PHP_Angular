import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AlertService } from 'src/app/libs/alert.service';
import { FileService } from 'src/app/libs/file.service';
import { ShareService } from 'src/app/libs/share.service';
import { AddressService } from 'src/app/services/address.service';
import { HomeService } from 'src/app/services/home.service';

declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  returnUrl: string;
  pipe = new DatePipe("en-US");
  listProvince = [];
  listDistrict = [];
  listCommune = [];
  style = {};
  file_avatar: File;

  constructor(
    private homeService: HomeService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private addressService: AddressService,
    private fileService: FileService,
    private shareService: ShareService
  ) { }

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

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      mat_khau: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      mat_khau_2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      ho_ten: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      so_dien_thoai: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      dia_chi: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      ngay_sinh: ['', [Validators.required]],
      city: ['', [Validators.required]],
      district: [{ value: '', disabled: true }, [Validators.required]],
      commune: [{ value: '', disabled: true }, [Validators.required]]
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

  getDistrict(id) {
    this.listDistrict = [];
    this.listCommune = [];
    this.addressService.getDistrict(id).subscribe((res:any) => {
      this.listDistrict = res;
      if(res) {
        this.form.controls.district.enable();
      }
    })
  }

  getCommune(id) {
    this.listCommune = [];
    this.addressService.getCommune(id).subscribe((res:any) => {
      this.listCommune = res;
      if(res) {
        this.form.controls.commune.enable();
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    
    if(this.form.invalid || !this.file_avatar) {
      return;
    }

    let user = {
      email: this.form.value.email,
      mat_khau: this.form.value.mat_khau,
      ho_ten: this.form.value.ho_ten,
      so_dien_thoai: this.form.value.so_dien_thoai,
      dia_chi: this.form.value.dia_chi,
      ward_id: this.form.value.commune,
      ngay_sinh: this.pipe.transform(this.form.value.ngay_sinh, "yyyy-MM-dd"),
      avatar: null
    }

    console.log(user);
    

    this.fileService.getEncodeFromImage(this.file_avatar).subscribe(data => {
      if (data != null) {
        user.avatar = data;
      }

      this.shareService.openLoading();
      this.homeService.register(user).subscribe((res: any) => {

        this.shareService.closeLoading();
        
        this.alertService.success(() => {

          this.shareService.openLoading();

          this.homeService.login(user).subscribe((res:any) => {

            this.shareService.closeLoading();

            localStorage.setItem("jwt", JSON.stringify(res.data));
            this.homeService.input(res.data);
            if (this.returnUrl) {
              this.router.navigateByUrl(this.returnUrl)
            } else {
              this.router.navigate(['/']);
            }
          }, err => {
            if (err.status != 1) {
              this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
            }
            this.shareService.closeLoading();
          })
        });

      }, err => {
        this.shareService.closeLoading();

        if (err.status != 1) {
          this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
        }
      });
    })
  }

  uploadButton() {
    $(".file-upload").click();
  }

  readFileUpload(files) {
    if (files && files[0]) {
      this.file_avatar = files[0];

      var reader = new FileReader();

      reader.onload = function (e) {
        $('.profile-pic').attr('src', e.target.result);
      }
      reader.readAsDataURL(files[0]);
    }
  }

}
