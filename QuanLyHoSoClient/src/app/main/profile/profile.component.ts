import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomeService} from "../../services/home.service";
import {MessageService} from "primeng/api";
import {AddressService} from "../../services/address.service";
import {FileService} from 'src/app/libs/file.service';
import {environment} from "../../../environments/environment";
import {DatePipe} from "@angular/common";
import {AlertService} from "../../libs/alert.service";

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  pipe = new DatePipe("en-US");
  title = "Hồ sơ";
  formProfile: FormGroup;
  formChangePass: FormGroup;
  submittedPro = false;
  submittedCP = false;
  listProvince = [];
  listDistrict = [];
  listCommune = [];
  style = {};
  file_avatar: File;

  constructor(
    private homeService: HomeService,
    private formBuider: FormBuilder,
    private messageService: MessageService,
    private addressService: AddressService,
    private fileService: FileService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.formProfile = this.formBuider.group({
      ho_ten: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      so_dien_thoai: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      dia_chi: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      ngay_sinh: ['', [Validators.required]],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      commune: ['', [Validators.required]]
    })

    this.formChangePass = this.formBuider.group({
      mat_khau_cu: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      mat_khau_moi: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      mat_khau_2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
    }, {
      validator: this.confirm_password_validate('mat_khau_moi', 'mat_khau_2')
    })

    let user = this.homeService.currentUser;

    this.addressService.getAddress(user.ward_id).subscribe((res: any) => {
      this.listProvince = res.list_province;
      this.listDistrict = res.list_district;
      this.listCommune = res.list_ward;
      this.formProfile.patchValue({
        ho_ten: user.ho_ten,
        so_dien_thoai: user.so_dien_thoai,
        ngay_sinh: new Date(Date.parse(user.ngay_sinh)),
        dia_chi: user.dia_chi,
        city: res.province.id,
        district: res.district.id,
        commune: res.ward.id
      })
    })
  }

  get getUserAvatar() {
    return environment.urlImg + this.homeService.currentUser.avatar;
  }

  confirm_password_validate(pass: string, pass_confirm: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[pass];
      const matchingControl = formGroup.controls[pass_confirm];

      if (matchingControl.errors && !matchingControl.errors.confirm_password) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirm_password: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  changeTitle(event) {
    this.title = event.target.innerHTML;
  }

  getDistrict(id) {
    this.listDistrict = [];
    this.listCommune = [];
    this.addressService.getDistrict(id).subscribe((res: any) => {
      this.listDistrict = res;
      if (this.listDistrict.length != 0) {
        this.formProfile.controls.district.enable();
      }
    })
  }

  getCommune(id) {
    this.listCommune = [];
    this.addressService.getCommune(id).subscribe((res: any) => {
      this.listCommune = res;
      if (this.listCommune.length != 0) {
        this.formProfile.controls.commune.enable();
      }
    })
  }

  changePass() {
    this.submittedCP = true;
    if (this.formChangePass.invalid) {
      return false;
    }
    this.homeService.changePass(this.formChangePass.value).subscribe((res: any) => {
      this.formChangePass.reset();
      this.submittedCP = false;
      this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Thay đổi mật khẩu thành công!"});
    }, err => {
      this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
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

  updateProfile() {
    let profile = {
      ho_ten: this.formProfile.value.ho_ten,
      so_dien_thoai: this.formProfile.value.so_dien_thoai,
      ngay_sinh: this.pipe.transform(this.formProfile.value.ngay_sinh, "yyyy-MM-dd"),
      dia_chi: this.formProfile.value.dia_chi,
      ward_id: this.formProfile.value.commune,
      avatar: null
    }
    this.fileService.getEncodeFromImage(this.file_avatar).subscribe((data:any) => {
      if(data != null) {
        profile.avatar = data;
      }

      this.homeService.update(profile).subscribe((res:any) => {
        localStorage.setItem("jwt", JSON.stringify(res.data));
        this.homeService.input(res.data);
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Cập nhật thông tin thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    })
  }

}
