import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {AdminService} from "../../../services/admin.service";
import {UserService} from "../../../services/user.service";
import {OrganService} from "../../../services/organ.service";
import {AddressService} from "../../../services/address.service";
import {MessageService} from "primeng/api";
import {FileService} from "../../../libs/file.service";
import {GetImagePipe} from "../../../libs/get.image.pipe";
import {ScriptService} from "../../../libs/script.service";

declare var $: any;
declare var demo: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [MessageService]
})
export class AccountComponent extends ScriptService implements OnInit {
  totalRecords: number;
  first = 0;
  rows = 8;
  listUser = [];
  listOrgan = [];
  listProvince = [];
  listDistrict = [];
  listCommune = [];
  roleSelect = 1;
  file_avatar;
  form: FormGroup;
  aoe: boolean;
  submitted: boolean;
  pipe = new DatePipe("en-US");
  datetimePicker = {};
  image: string;

  constructor(
    injector: Injector,
    private adminService: AdminService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private organService: OrganService,
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

    let elem = document.getElementsByClassName('script');
    if (elem.length != undefined) {
      for (let i = elem.length - 1; 0 <= i; i--) {
        elem[i].remove();
      }
    }
    this.loadScripts();

    this.organService.getAll().subscribe((res: any) => {
      this.listOrgan = res.filter(e => {
        return e.deleted_at == null;
      });
    });

    this.addressService.getProvince().subscribe((res: any) => {
      this.listProvince = res.filter(e => {
        return e.deleted_at == null;
      });
    });

    this.loadData({first: this.first, rows: this.rows});


    this.form = this.formBuilder.group({
      id: [],
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      mat_khau: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      mat_khau_2: [''],
      ho_ten: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      so_dien_thoai: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      dia_chi: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      ngay_sinh: ['', [Validators.required]],
      id_co_quan: [{value: '', disabled: true}],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      commune: ['', [Validators.required]]
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
        matchingControl.setErrors({confirm_password: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  getDistrict(id) {
    this.addressService.getDistrict(id).subscribe((res: any) => {
      this.listDistrict = res.filter(e => {
        return e.deleted_at == null;
      });
      if (res) this.form.controls.district.enable();
    })
  }

  getCommune(id) {
    this.addressService.getCommune(id).subscribe((res: any) => {
      this.listCommune = res.filter(e => {
        return e.deleted_at == null;
      });

      if (res) this.form.controls.commune.enable();
    })
  }

  get User() {
    return this.adminService.currentUser;
  }

  loadData(event) {
    this.first = event.first;
    this.rows = event.rows;
    this.userService.loadData(this.first, this.rows).subscribe((res: any) => {
      this.listUser = res.data;
      this.totalRecords = res.total;
    })
  }

  choiceRole(role) {
    this.roleSelect = role;
    if (role == 2) {
      this.form.controls.id_co_quan.setValidators([Validators.required]);
      this.form.controls.id_co_quan.enable();
    } else {
      this.form.controls.id_co_quan.disable();
    }
  }

  create() {
    this.form.controls.district.disable();
    this.form.controls.commune.disable();
    this.form.controls.email.enable();

    this.aoe = true;
    this.openModal();
  }

  edit(id) {
    this.aoe = false;
    this.openModal();

    this.form.controls.mat_khau.clearValidators();
    this.form.controls.mat_khau.updateValueAndValidity();
    this.form.controls.district.enable();
    this.form.controls.commune.enable();

    this.userService.get(id).subscribe((data: any) => {
      $("#roleSelect" + data.role).addClass("active");
      this.roleSelect = data.role;
      if (data.role == 2) {
        this.form.controls.id_co_quan.enable();
        this.form.patchValue({id_co_quan: data.id_co_quan})
      }
      this.image = new GetImagePipe().transform(data.avatar);
      this.form.controls.email.disable();
      this.form.patchValue({
        id: data.id,
        email: data.email,
        ho_ten: data.ho_ten,
        so_dien_thoai: data.so_dien_thoai,
        ngay_sinh: new Date(Date.parse(data.ngay_sinh)),
        dia_chi: data.dia_chi
      })
      this.addressService.getAddress(data.ward_id).subscribe((res: any) => {
        this.listProvince = res.list_province.filter(e => {
          return e.deleted_at == null;
        });
        this.listDistrict = res.list_district.filter(e => {
          return e.deleted_at == null;
        });
        this.listCommune = res.list_ward.filter(e => {
          return e.deleted_at == null;
        });
        this.form.patchValue({
          city: res.province.id,
          district: res.district.id,
          commune: res.ward.id,
        })
      })
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
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
      role: this.roleSelect,
      id_co_quan: this.form.value.id_co_quan,
      avatar: null
    }

    this.fileService.getEncodeFromImage(this.file_avatar).subscribe(data => {
      if (data != null) {
        user.avatar = data;
      }
      if (this.aoe == true) {
        this.userService.create(user).subscribe((res: any) => {
          this.submitted = false;
          this.closeModal();
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Thêm người dùng thành công!"});
        }, err => {
          console.log(err)
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      } else {
        this.userService.update(this.form.value.id, user).subscribe((res:any) => {
          this.submitted = false;
          this.closeModal();
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Sửa người dùng thành công!"});
        }, err => {
          console.log(err)
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      }
    })

  }

  openModal() {
    this.submitted = false;
    $(".choice").removeClass("active");
    this.image = "assets/img/default-avatar.png";
    this.form.controls.id_co_quan.disable();
    this.file_avatar = null;
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
    this.form.reset();
  }

  readFileUpload(files) {
    if (files && files[0]) {
      this.file_avatar = files[0];
    }
  }

  convertString(value, length) {
    if (value.length > length) {
      return value.substring(0, length - 3) + '...';
    }
    return value;
  }

  block(id) {
    if (confirm("Bạn muốn khóa người dùng này?")) {
      this.userService.block(id).subscribe(res => {
        this.loadData({first: this.first, rows: this.rows});
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Khóa người dùng thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    }
  }

  unblock(event) {
    if (event.target.checked) {
      if (confirm("Bạn muốn mở khóa người dùng này?")) {
        this.userService.unblock(event.target.value).subscribe((res:any) => {
          // this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Mở khóa người dùng thành công!"});
        }, err => {
          console.log(err);
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      } else {
        this.loadData({first: this.first, rows: this.rows});
      }
    } else {
      if (confirm("Bạn muốn khóa người dùng này?")) {
        this.userService.block(event.target.value).subscribe((res:any) => {
          // this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Khóa người dùng thành công!"});
        }, err => {
          console.log(err);
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      } else {
        this.loadData({first: this.first, rows: this.rows});
      }
    }
  }

}
