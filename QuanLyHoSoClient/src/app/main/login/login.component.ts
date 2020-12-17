import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../services/home.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../libs/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import { ShareService } from 'src/app/libs/share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
    private homeService: HomeService,
    private alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private shareService: ShareService
  ) {
  }

  ngOnInit(): void {
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(100)]],
      mat_khau: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
    })
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    this.shareService.openLoading();
    this.homeService.login(this.form.value).subscribe((res:any) => {
      this.shareService.closeLoading();
      
      localStorage.setItem("jwt", JSON.stringify(res.data));
      this.homeService.input(res.data);

      if (this.returnUrl) {
        this.router.navigateByUrl(this.returnUrl)
      } else {
        this.router.navigate(['/']);
      }

    }, err => {
      if (err.status != 1) {
        this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
      }
      this.shareService.closeLoading();
    })
  }

}