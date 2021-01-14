import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {MessageService} from "primeng/api";
import { ShareService } from 'src/app/services/share.service';

declare var md:any;

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css'],
  providers: [MessageService]
})
export class ChangepassComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;

  constructor(
    private adminService: AdminService,
    private formBuider: FormBuilder,
    private messageService: MessageService,
    private shareService: ShareService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuider.group({
      mat_khau_cu: ['', [Validators.required]],
      mat_khau_moi: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      mat_khau_2: ['', Validators.required]
    }, {
      validator: this.confirm_password_validate('mat_khau_moi', 'mat_khau_2')
    })
  }

  get User() {
    return this.adminService.currentUser;
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

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.shareService.openLoading();
    this.adminService.changePass(this.form.value).subscribe((res:any) => {
      this.shareService.closeLoading();
      this.submitted = false;
      this.messageService.add({ severity: 'success', summary: 'Thành công!', detail: "Cập nhật mật khẩu thành công." });
      this.form.reset();
    }, err => {
      this.shareService.closeLoading();
      this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
    })
  }

}
