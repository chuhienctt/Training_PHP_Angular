import {Component, Injector, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {environment} from "../../../environments/environment";
import {ScriptService} from "../../libs/script.service";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var $:any;

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
  form: FormGroup;
  aoe: boolean;

  constructor(
    injector: Injector,
    private adminService: AdminService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    super(injector)
  }

  ngOnInit(): void {
    let elem = document.getElementsByClassName('script');
    if (elem.length != undefined) {
      for (let i = elem.length - 1; 0 <= i; i--) {
        elem[i].remove();
      }
    }
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

  create() {
    this.aoe = true;
    // $('.card.card-wizard').addClass('active');
    $("#myModal").modal("show");
  }

}
