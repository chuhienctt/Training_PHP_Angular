import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HistoryService} from "../../services/history.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressService} from "../../services/address.service";
import {FileService} from "../../libs/file.service";
import {MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css'],
  providers: [MessageService]
})
export class HistoryDetailComponent implements OnInit {
  pipe = new DatePipe("en-US");
  form: FormGroup;
  template = [];
  submitted: boolean;
  fileName:any;

  constructor(
    private route: ActivatedRoute,
    private historyService: HistoryService,
    private addressService: AddressService,
    private fileService: FileService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getTemplate();
  }

  getTemplate() {
    this.historyService.getDetail(this.route.snapshot.params['id']).subscribe((res:any) => {
      this.template = res.thong_tin;
      console.log(this.template)
      let f: any = {};
      res.thong_tin.forEach(input => {
        let validate = [];
        input.validate = [];

        if (input.name == 'ward_id') {
          input.value = "";
        }

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
        if (input.type != 'file' && input.type != 'select') {
          if (input.type == 'date') {
            f[input.name] = new FormControl(new Date(input.value), validate);
          } else {
            f[input.name] = new FormControl(input.value, validate);
          }
        } else {
          f[input.name] = new FormControl('', validate);
        }
      })
      this.form = new FormGroup(f);
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.form.value.id = this.route.snapshot.params['id'];
    this.fileService.getEncodeFromImages(this.fileName).then(data => {
      if (data != null) {
        this.form.value.dinh_kem = data;
      }
      this.form.value.ngay_sinh = this.pipe.transform(this.form.value.ngay_sinh, "yyyy-MM-dd");
      this.historyService.updateProfile(this.form.value.id,this.form.value).subscribe((res:any) => {
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

  readFileUpload(files) {
    this.fileName = files;
  }

}
