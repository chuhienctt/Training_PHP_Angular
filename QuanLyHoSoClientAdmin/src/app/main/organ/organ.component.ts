import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {ScriptService} from "../../libs/script.service";
import {FeildService} from "../../services/feild.service";
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {OrganService} from "../../services/organ.service";
import {FileUpload} from "primeng/fileupload";
import {FileService} from "../../libs/file.service";
import {AddressService} from "../../services/address.service";

declare var $: any;

@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.css'],
  providers: [MessageService]
})
export class OrganComponent extends ScriptService implements OnInit {
  @ViewChild(FileUpload, { static: false }) file: FileUpload
  public Editor = ClassicEditor;
  listFeild = [];
  totalRecords: number;
  loading: boolean;
  aoe: boolean;
  form: FormGroup;
  submited = false;
  listOrgan = [];
  listCity = [];
  listDistrict = [];
  listCommune = [];
  first = 0;
  rows = 10;
  style = {};
  image:string;

  constructor(
    injetor: Injector,
    private primeConfig: PrimeNGConfig,
    private feildService: FeildService,
    private formBuilder: FormBuilder,
    private organService: OrganService,
    private messageService: MessageService,
    private fileService: FileService,
    private addressService: AddressService
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

    this.addressService.getProvince().subscribe((res: any) => {
      this.listCity = res;
    });

    this.style = {
      width: '100%',
      boder: '1px solid rgba(51, 51, 51, 0.1);',
      'font-weight': 400,
      'font-family': 'Roboto'
    };

    this.form = this.formBuilder.group({
      id: [''],
      ten_co_quan: ['', [Validators.required, Validators.maxLength(255)]],
      dia_chi: ['', [Validators.maxLength(255)]],
      email: ['', [Validators.maxLength(100), Validators.required, Validators.email]],
      so_dien_thoai: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      linh_vuc: [''],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      commune: ['', [Validators.required]]
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
      this.addressService.getAddress(res.ward_id).subscribe((data:any) => {
        this.listCity = data.list_province;
        this.listDistrict = data.list_district;
        this.listCommune = data.list_ward;
        this.form.patchValue({
          id: res.id,
          ten_co_quan: res.ten_co_quan,
          email: res.email,
          dia_chi: res.dia_chi,
          so_dien_thoai: res.so_dien_thoai,
          city: data.province,
          district: data.district,
          commune: data.ward
        })
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
      hinh_anh: null,
      ward_id: this.form.value.commune.id
    }
    if (this.aoe == true) {
      this.fileService.getEncodeFromImage(this.file.files[0]).subscribe(data => {
        if (data != null) {
          organ.hinh_anh = data;
          this.organService.create(organ).subscribe((res: any) => {
            this.loadData({first: this.first, rows: this.rows});
            $("#largeModal").modal("hide");
            this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Thêm cơ quan thành công!"});
          }, err => {
            console.log(err)
            this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
          })
        }
      })
    } else {
      this.fileService.getEncodeFromImage(this.file.files[0]).subscribe(data => {
        if (data != null) {
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

  createImg(path) {
    return environment.urlImg + path;
  }


  getDistrict(val) {
    this.listDistrict = [];
    this.listCommune = [];
    this.addressService.getDistrict(val.id).subscribe((res:any) => {
      this.listDistrict = res;
      if (this.listDistrict.length != 0) {
        this.form.controls.district.enable();
      }
    })
  }

  getCommune(val) {
    this.listCommune = [];
    this.addressService.getCommune(val.id).subscribe((res:any) => {
      this.listCommune = res;
      if (this.listCommune.length != 0) {
        this.form.controls.commune.enable();
      }
    })
  }
}
