import {Component, Injector, OnInit} from '@angular/core';
import {ScriptService} from "../../libs/script.service";
import {MessageService} from "primeng/api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent extends ScriptService implements OnInit {
  form: FormGroup;
  submited = false;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private messageService: MessageService) {
    super(injector)
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      mat_khau: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
    })
  }

  login() {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }
    let user = {
      email: this.form.value.email,
      mat_khau: this.form.value.mat_khau
    }
    this.adminService.login(user).subscribe((res: any) => {
      localStorage.setItem("jwt", JSON.stringify(res.data.token));
      location.replace("/admin");
      // this.router.navigate(["/admin"]);
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
    });
  }

}
