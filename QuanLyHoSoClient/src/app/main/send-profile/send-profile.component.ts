import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {SendProfileService} from "../../services/send-profile.service";
import {ActivatedRoute} from "@angular/router";
import {AddressService} from "../../services/address.service";
import {FileService} from "../../libs/file.service";
import {DatePipe} from "@angular/common";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-send-profile',
  templateUrl: './send-profile.component.html',
  styleUrls: ['./send-profile.component.css'],
  providers: [MessageService]
})
export class SendProfileComponent implements OnInit {
  pipe = new DatePipe("en-US");
  activeIndex = 3;
  items: any;
  form: FormGroup;
  listProcedure: any;
  template: any;
  id_quy_trinh: number;
  fileName:any;
  submitted: boolean;
  profile:any;
  profileDetail: any;

  constructor(
    private sendProfileService: SendProfileService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private addressService: AddressService,
    private fileService: FileService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.items = [{
      label: 'Đăng nhập, đăng ký',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
      {
        label: 'Lựa chọn quy trình, cơ quan',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Nộp hồ sơ trực tuyến',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: 'Theo dõi kết quả',
        command: (event: any) => {
          this.activeIndex = 3;
        }
      }
    ];

    this.getProcedure(this.route.snapshot.params['id']);

    this.form = this.formBuilder.group({
      id_quy_trinh: ['', Validators.required]
    })
  }

  getProcedure(id) {
    this.sendProfileService.getProcedure(id).subscribe((res: any) => {
      this.listProcedure = res;
    })
  }

  nextTab() {
    this.activeIndex++;
  }

  previousTab() {
    this.activeIndex--;
  }

  getTemplate(id) {
    this.id_quy_trinh = id;
    this.sendProfileService.getTemplate(id).subscribe((res: any) => {
      let f: any = {};
      res.forEach(input => {
        let validate = [];
        input.validate = [];
        if (input.required) {
          validate.push(Validators.required);
          input.validate.push('required');
          input.validate.push({name: 'required', message: input.title + ' không được để trống.'});
        }
        switch (input.type) {
          case 'text':
            validate.push(Validators.maxLength(255));
            input.validate.push({name: 'maxlength', message: input.title + ' không quá 255 ký tự.'});
            break;
          case 'email':
            validate.push(Validators.email, Validators.maxLength(100));
            input.validate.push(
              {name: 'maxlength', message: input.title + ' không quá 255 ký tự.'},
              {name: 'email', message: input.title + ' không đúng định dạng.'}
            );
            break;
          case 'phone_number':
            validate.push(Validators.pattern('^(0)[0-9]{9}$'));
            input.validate.push({name: 'pattern', message: input.title + ' không đúng định dạng.'});
        }
        f[input.name] = new FormControl('', validate);
      })
      this.template = res;
      this.form = new FormGroup(f);
    })
  }

  readFileUpload(files) {
    this.fileName = files;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.fileService.getEncodeFromImages(this.fileName).then(data => {
      if (data != null) {
        this.form.value.dinh_kem = data;
      }
      this.form.value.ngay_sinh = this.pipe.transform(this.form.value.ngay_sinh, "yyyy-MM-dd");
      this.form.value.id_quy_trinh = this.id_quy_trinh;
      this.sendProfileService.sendProfile(this.form.value).subscribe((res:any) => {
        this.profile = res;
        this.profileDetail = JSON.parse(res.thong_tin);
        this.submitted = false;
        this.activeIndex = 3;
        this.messageService.add({ severity: 'success', summary: 'Thành công!', detail: res.message });
      }, err => {
        console.log(err.error);
        this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
      })
    })
  }

  changeSelect(id, name) {
    if (name == 'province_id') {
      this.template.map(e => {
        if (e.name == 'district_id') {
          this.addressService.getDistrict(id).subscribe((res: any) => {
            e.value = res;
          })
        }
        return e;
      })
    } else if (name == 'district_id') {
      this.template.map(e => {
        if (e.name == 'ward_id') {
          this.addressService.getCommune(id).subscribe((res: any) => {
            e.value = res;
          })
        }
        return e;
      })
    }
  }

}
