import {Component, Injector, OnInit} from '@angular/core';
import {ScriptService} from "../../libs/script.service";
import {AdminService} from "../../services/admin.service";
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {AddressService} from "../../services/address.service";
declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends ScriptService implements OnInit {
  pipe = new DatePipe("en-US");
  form: FormGroup;
  listProvince = [];
  listDistrict = [];
  listCommune = [];
  provinceId: number;
  districtId: number;
  communeId: number;

  constructor(
    injector: Injector,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private addressService: AddressService
  ) {
    super(injector)
  }

  ngOnInit(): void {
    // $(".selectpicker").selectpicker();
    $(".datepicker").datetimepicker({
      format: "DD/MM/YYYY",
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-screenshot",
        clear: "fa fa-trash",
        close: "fa fa-remove"
      }
    })

    this.form = this.formBuilder.group({
      avatar: ['', [Validators.required]],
      email: [{value: '', disabled: true}],
      ho_ten: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      so_dien_thoai: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      dia_chi: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      ngay_sinh: ['', [Validators.required]],
      city: ['', ],
      district: [{value: '', disabled: true}, ],
      commune: [{value: '', disabled: true}, ]
    })

    this.addressService.getAddress(this.User.ward_id).subscribe((data:any) => {
      // console.log(data.province.id)
      this.listProvince = data.list_province;
      this.listDistrict = data.list_district;
      this.listCommune = data.list_ward;
      this.provinceId = data.province.id;
      this.districtId = data.district.id;
      this.communeId = data.ward.id;
      // console.log(this.provinceId)
      this.form.patchValue({
        email: this.User.email,
        ho_ten: this.User.ho_ten,
        so_dien_thoai: this.User.so_dien_thoai,
        dia_chi: this.User.dia_chi,
        ngay_sinh: this.pipe.transform(this.User.ngay_sinh, "dd-MM-yyyy"),
        // city: data.province.id

      })
    })
  }

  getDistrict(id) {
    console.log(id)
    this.addressService.getDistrict(id).subscribe((res:any) => {
      this.listDistrict = res;
      console.log(this.listDistrict)
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

  onSubmit() {

  }

  // a(event) {
  //
  //   if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
  //     return;
  //   }
  //
  //   console.log(event.target.files[0].name)
  // }

}
