import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css'],
  providers: [MessageService]
})
export class ChangepassComponent implements OnInit {
  form: any;
  iSubmited: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      mat_khau_cu: ['',[Validators.required]],
      mat_khau_moi: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      mat_khau_2: ['',[Validators.required]],
    }, {
      validator: this.confirm_password_validate('mat_khau_moi', 'mat_khau_2')
    });
  }
  
  onSubmit() {
    this.iSubmited = true;
    if(this.form.invalid) {
      return;
    }

    console.log(this.form.value);
    
    this.authService.changepass(this.form.value).subscribe((res: any) => {
      this.form.reset();
      this.iSubmited = false;
      this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Thay đổi mật khẩu thành công!"});
    }, err => {
      if (err.status != 1) {
        this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
      }
    });
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

}
