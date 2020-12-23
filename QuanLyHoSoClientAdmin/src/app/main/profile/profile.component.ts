import {Component, Injector, OnInit} from '@angular/core';
import {ScriptService} from "../../libs/script.service";
import {AdminService} from "../../services/admin.service";
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {AddressService} from "../../services/address.service";
import {MessageService} from "primeng/api";
import {FileService} from "../../libs/file.service";
declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent extends ScriptService implements OnInit {
  pipe = new DatePipe("en-US");
  form: FormGroup;
  listProvince = [];
  listDistrict = [];
  listCommune = [];
  file_avatar: File;
  submitted = false;
  datetimePicker = {};

  constructor(
    injector: Injector,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private messageService: MessageService,
    private fileService: FileService
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this.datetimePicker = {
      dateInputFormat: 'DD-MM-YYYY',
      adaptivePosition: true,
      isAnimated: true,
      maxDate: new Date(),
      containerClass: 'theme-dark-blue'
    }

    this.form = this.formBuilder.group({
      email: [{value: '', disabled: true}],
      ho_ten: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      so_dien_thoai: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      dia_chi: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      ngay_sinh: ['', [Validators.required]],
      city: ['', ],
      district: ['', ],
      commune: ['', Validators.required]
    })

    this.addressService.getAddress(this.User.ward_id).subscribe((data:any) => {
      this.listProvince = data.list_province;
      this.listDistrict = data.list_district;
      this.listCommune = data.list_ward;

      this.form.patchValue({
        email: this.User.email,
        ho_ten: this.User.ho_ten,
        so_dien_thoai: this.User.so_dien_thoai,
        dia_chi: this.User.dia_chi,
        ngay_sinh: new Date(Date.parse(this.User.ngay_sinh)),
        city: data.province.id,
        district: data.district.id,
        commune: data.ward.id,
      })
    })

    this.loadScripts();
  }

  getDistrict(id) {
    this.addressService.getDistrict(id).subscribe((res:any) => {
      this.listDistrict = res;
    })
  }

  getCommune(id) {
    this.addressService.getCommune(id).subscribe((res:any) => {
      this.listCommune = res;
    })
  }

  get User() {
    return this.adminService.currentUser;
  }

  createImg(path) {
    return environment.urlImg + path;
  }

  a(event) {
    console.log(event)
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let profile = {
      ho_ten: this.form.value.ho_ten,
      so_dien_thoai: this.form.value.so_dien_thoai,
      dia_chi: this.form.value.dia_chi,
      ward_id: this.form.value.commune,
      ngay_sinh: this.pipe.transform(this.form.value.ngay_sinh, "yyyy-MM-dd"),
      avatar: null
    }

    this.fileService.getEncodeFromImage(this.file_avatar).subscribe(data => {
      if (data != null) {
        profile.avatar = data;
      }

      this.adminService.update(profile).subscribe((res:any) => {
        localStorage.setItem("jwt", JSON.stringify(res.data));
        this.adminService.input(res.data);
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Cập nhật thông tin thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    })

  }

  readFileUpload(files) {
    if (files && files[0]) {
      this.file_avatar = files[0];
    }
  }

}
