import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css'],
  providers: [MessageService]
})
export class Login1Component implements OnInit {
  title = 'Login';
  form: any;
  iSubmited: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      mat_khau: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
     
    });
  }

  onSubmit() {
    this.iSubmited = true;
    if(this.form.invalid) {
      return;
    }

    console.log(this.form.value);
    
    this.authService.login(this.form.value).subscribe((res: any) => {
      localStorage.setItem("jwt", JSON.stringify(res.data));
      this.authService.input(res.data);
      this.router.navigate(['/dashboard']);
    }, err => {
      if (err.status != 1) {
        console.log(err.error.message);
        this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
      }
    });
  }
}
