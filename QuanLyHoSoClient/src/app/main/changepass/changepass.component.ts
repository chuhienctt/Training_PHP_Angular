import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ShareService } from 'src/app/libs/share.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css'],
  providers: [MessageService]
})
export class ChangepassComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private homeService: HomeService,
    private formBuider: FormBuilder,
    private messageService: MessageService,
    private shareService: ShareService
  ) { }

  ngOnInit(): void {

    this.form = this.formBuider.group({
      mat_khau_cu: ['', [Validators.required]],
      mat_khau_moi: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      mat_khau_2: ['', [Validators.required]],
    }, {
      validator: this.confirm_password_validate('mat_khau_moi', 'mat_khau_2')
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

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return false;
    }

    this.shareService.openLoading();

    this.homeService.changePass(this.form.value).subscribe((res: any) => {

      this.shareService.closeLoading();

      this.form.reset();
      this.submitted = false;
      this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Thay đổi mật khẩu thành công!"});
    }, err => {
      this.shareService.closeLoading();
      this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
    })
  }

}
