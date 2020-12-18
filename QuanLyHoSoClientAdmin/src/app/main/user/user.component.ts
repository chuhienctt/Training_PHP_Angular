import {Component, Injector, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {environment} from "../../../environments/environment";
import {ScriptService} from "../../libs/script.service";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { OrganService } from 'src/app/services/organ.service';
import { AddressService } from 'src/app/services/address.service';
declare var $: any;
declare var demo: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends ScriptService implements OnInit {
  totalRecords: number;
  rows = 10;
  first = 0;
  listUser = [];
  listOrgan = [];
  listProvince = [];
  listDistrict = [];
  listCommune = [];
  roleSelect = 1;
  file_avatar;
  form: FormGroup;
  aoe: boolean;
  ok:boolean;

  constructor(
    injector: Injector,
    private adminService: AdminService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private organService: OrganService,
    private addressService: AddressService
  ) {
    super(injector)
  }

  ngOnInit(): void {

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

    let elem = document.getElementsByClassName('script');
    if (elem.length != undefined) {
      for (let i = elem.length - 1; 0 <= i; i--) {
        elem[i].remove();
      }
    }

    this.organService.getAll().subscribe((res: any) => {
      this.listOrgan = res;
    });

    this.addressService.getProvince().subscribe((res: any) => {
      this.listProvince = res;
    });

    this.loadScripts();

    this.loadData({first: this.first, rows: this.rows});


    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      mat_khau: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      mat_khau_2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      ho_ten: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      so_dien_thoai: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      dia_chi: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      ngay_sinh: ['', [Validators.required]],
      id_co_quan: [''],
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
    this.addressService.getDistrict(id).subscribe((res:any) => {
      this.listDistrict = res;

      if(res) this.form.controls.district.enable();
    })
  }

  getCommune(id) {
    this.addressService.getCommune(id).subscribe((res:any) => {
      this.listCommune = res;

      if(res) this.form.controls.commune.enable();
    })
  }

  get User() {
    return  this.adminService.currentUser;
  }

  createImg(path) {
    return environment.urlImg + path;
  }

  loadData(event) {
    this.userService.loadData(event.first, event.rows).subscribe((res:any) => {
      this.listUser = res.data;
    })
  }

  choiceRole(role) {
    this.roleSelect = role;
  }

  create() {
    this.aoe = true;
    this.openModal();
  }

  onSubmit() {
    console.log(this.file_avatar);
  }

  openModal() {
    $('#myModal').on('show.bs.modal', function (e) {
      setTimeout(() => {
        $('.card.card-wizard').addClass('active');
        demo.initMaterialWizard();
      }, 200);
    });

    $("#myModal").modal("show");
  }

  closeModal() {
    $("#myModal").modal("hide");
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
