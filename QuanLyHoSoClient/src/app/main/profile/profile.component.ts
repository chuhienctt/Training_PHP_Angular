import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomeService} from "../../services/home.service";
import {MessageService} from "primeng/api";
import {AddressService} from "../../services/address.service";
import {FileService} from 'src/app/libs/file.service';
import {DatePipe} from "@angular/common";
import {AlertService} from "../../libs/alert.service";
import { Router } from '@angular/router';
import { ShareService } from 'src/app/libs/share.service';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  pipe = new DatePipe("en-US");
  form: FormGroup;
  submitted = false;
  listProvince = [];
  listDistrict = [];
  listCommune = [];
  file_avatar: File;

  constructor(
    private homeService: HomeService,
    private formBuider: FormBuilder,
    private messageService: MessageService,
    private addressService: AddressService,
    private fileService: FileService,
    private shareService: ShareService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuider.group({
      ho_ten: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      so_dien_thoai: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      dia_chi: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      ngay_sinh: ['', [Validators.required]],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      commune: ['', [Validators.required]]
    })

    let user = this.homeService.currentUser;

    this.addressService.getAddress(user.ward_id).subscribe((res: any) => {
      this.listProvince = res.list_province;
      this.listDistrict = res.list_district;
      this.listCommune = res.list_ward;

      this.form.patchValue({
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

  get user() {
    return this.homeService.currentUser;
  }

  getDistrict(id) {
    this.listDistrict = [];
    this.listCommune = [];

    this.shareService.openLoading();
    this.addressService.getDistrict(id).subscribe((res: any) => {
      this.listDistrict = res;
      this.shareService.closeLoading();
    })
  }

  getCommune(id) {
    this.listCommune = [];
    
    this.shareService.openLoading();
    this.addressService.getCommune(id).subscribe((res: any) => {
      this.listCommune = res;
      this.shareService.closeLoading();
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

  onSubmit() {
    let profile = {
      ho_ten: this.form.value.ho_ten,
      so_dien_thoai: this.form.value.so_dien_thoai,
      ngay_sinh: this.pipe.transform(this.form.value.ngay_sinh, "yyyy-MM-dd"),
      dia_chi: this.form.value.dia_chi,
      ward_id: this.form.value.commune,
      avatar: null
    }

    this.fileService.getEncodeFromImage(this.file_avatar).subscribe((data:any) => {
      if(data != null) {
        profile.avatar = data;
      }

      this.shareService.openLoading();
      this.homeService.update(profile).subscribe((res:any) => {
        this.shareService.closeLoading();
        localStorage.setItem("jwt", JSON.stringify(res.data));
        this.homeService.input(res.data);
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Cập nhật thông tin thành công!"});
      }, err => {
        this.shareService.closeLoading();
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    })
  }

}
