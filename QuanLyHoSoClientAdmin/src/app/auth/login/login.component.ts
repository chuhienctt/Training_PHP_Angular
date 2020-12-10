import {Component, Injector, OnInit} from '@angular/core';
import {ScriptService} from "../../libs/script.service";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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

  constructor(
    injector: Injector,
    private adminService: AdminService,
    private router: Router,
    private messageService: MessageService) {
    super(injector)
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      "email": new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      "mat_khau": new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ])
    })
  }

  login() {
    let user = {
      email: this.form.value.email,
      mat_khau: this.form.value.mat_khau
    }
    console.log(user)
    this.adminService.login(user).subscribe((res: any) => {
      console.log(res)
      localStorage.setItem("jwt", JSON.stringify(res.data));
      location.replace("/admin");
      // this.router.navigate(["/admin"]);
    }, err => {
      console.log(err)
      this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
    });
  }

}
