import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {ScriptService} from "../../libs/script.service";
import {FeildService} from "../../services/feild.service";
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrganService} from "../../services/organ.service";

declare var $: any;

@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.css'],
  providers: [MessageService]
})
export class OrganComponent extends ScriptService implements OnInit {
  public Editor = ClassicEditor;
  listFeild = [];
  totalRecords: number;
  loading: boolean;
  aoe: boolean;
  form: FormGroup;
  submited = false;
  listOrgan = [];
  first = 0;
  rows = 10;

  constructor(
    injetor: Injector,
    private primeConfig: PrimeNGConfig,
    private feildService: FeildService,
    private formBuilder: FormBuilder,
    private organService: OrganService,
    private messageService: MessageService
  ) {
    super(injetor)
  }

  ngOnInit(): void {
    let elem = document.getElementsByClassName('script');
    if (elem.length != undefined) {
      for (let i = elem.length - 1; 0 <= i; i--) {
        elem[i].remove();
      }
    }
    this.loadScripts();

    this.form = this.formBuilder.group({
      id: [''],
      ten_co_quan: ['', [Validators.required, Validators.maxLength(255)]],
      dia_chi: ['', [Validators.maxLength(255)]],
      email: ['', [Validators.maxLength(100), Validators.required, Validators.email]],
      so_dien_thoai: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      linh_vuc: [''],
    })

    this.feildService.getAll().subscribe((res: any) => {
      this.listFeild = res.filter(e => {return e.deleted_at == null});
    })
  }

  loadData(event) {
    this.first = event.first;
    this.rows = event.rows;
    this.organService.getData(this.first, this.rows).subscribe((res: any) => {
      this.listOrgan = res.data.filter(e => {
        return e.deleted_at == null
      });
      this.totalRecords = res.total;
    })
  }

  create() {
    this.form.reset();
    $("#largeModal").modal("show");
    this.aoe = true;
  }

  edit(id) {
    $("#largeModal").modal("show");
    this.aoe = false;
    this.organService.edit(id).subscribe((res: any) => {
      this.form.patchValue({
        id: res.id,
        ten_co_quan: res.ten_co_quan,
        email: res.email,
        dia_chi: res.dia_chi,
        so_dien_thoai: res.so_dien_thoai
      })
    })
  }

  onSubmit() {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }
    let organ = {
      id: this.form.value.id,
      ten_co_quan: this.form.value.ten_co_quan,
      email: this.form.value.email,
      dia_chi: this.form.value.dia_chi,
      so_dien_thoai: this.form.value.so_dien_thoai,
      linh_vuc: this.form.value.linh_vuc.map(e => {
        return e.id
      }),
    }
    if (this.aoe == true) {
      this.organService.create(organ).subscribe((res: any) => {
        this.loadData({first: this.first, rows: this.rows});
        $("#largeModal").modal("hide");
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Thêm cơ quan thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    } else {
      this.organService.update(organ).subscribe((res: any) => {
        this.submited = false;
        this.loadData({first: this.first, rows: this.rows});
        $("#largeModal").modal("hide");
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Cập nhật cơ quan thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    }
  }

  delete(id) {
    if (confirm("Bạn muốn xóa cơ quan này?")) {
      this.organService.delete(id).subscribe((res: any) => {
        this.loadData({first: this.first, rows: this.rows});
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Xoá cơ quan thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    }
  }
}
