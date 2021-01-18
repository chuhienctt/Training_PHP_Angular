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
import {GetImagePipe} from "../../libs/get.image.pipe";
import { ShareService } from 'src/app/services/share.service';

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
  submitted = false;
  listOrgan = [];
  listCity = [];
  listDistrict = [];
  listCommune = [];
  first = 0;
  rows = 10;
  style = {};
  image:string;
  file_img:File;

  constructor(
    injetor: Injector,
    private primeConfig: PrimeNGConfig,
    private feildService: FeildService,
    private formBuilder: FormBuilder,
    private organService: OrganService,
    private messageService: MessageService,
    private fileService: FileService,
    private addressService: AddressService,
    private shareService: ShareService
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
      this.listCity = res.filter(e => {
        return e.deleted_at == null;
      });
    });

    this.form = this.formBuilder.group({
      id: [''],
      ten_co_quan: ['', [Validators.required, Validators.maxLength(255)]],
      code: ['',[Validators.required, Validators.maxLength(255)]],
      dia_chi: ['', [Validators.maxLength(255)]],
      email: ['', [Validators.maxLength(100), Validators.required, Validators.email]],
      so_dien_thoai: ['', [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      linh_vuc: [''],
      city: ['', [Validators.required]],
      district: [{value: '', disabled: true}, [Validators.required]],
      commune: [{value: '', disabled: true}, [Validators.required]]
    })

    this.feildService.getAll().subscribe((res: any) => {
      this.listFeild = res.filter(e => {return e.deleted_at == null});
    })

    this.loadData({first: this.first, rows: this.rows})
  }

  loadData(event) {
    this.first = event.first;
    this.rows = event.rows;
    this.organService.getData(this.first, this.rows).subscribe((res: any) => {
      this.listOrgan = res.data;
      this.totalRecords = res.total;
    })
  }

  create() {
    this.openModal();
    this.image = "assets/img/image_placeholder.jpg";
    this.file_img = null;
    this.aoe = true;
    this.form.controls.district.disable();
    this.form.controls.commune.disable();
  }

  edit(id) {
    this.openModal();
    this.aoe = false;
    this.form.controls.district.enable();
    this.form.controls.commune.enable();

    this.organService.edit(id).subscribe((res: any) => {
      this.form.patchValue({
        id: res.id,
        ten_co_quan: res.ten_co_quan,
        code: res.code,
        email: res.email,
        dia_chi: res.dia_chi,
        so_dien_thoai: res.so_dien_thoai,
        linh_vuc: res.linh_vuc.map(e => {return e.id})
      })
      this.image = new GetImagePipe().transform(res.hinh_anh);
      this.addressService.getAddress(res.ward_id).subscribe((data:any) => {
        this.listCity = data.list_province;
        this.listDistrict = data.list_district;
        this.listCommune = data.list_ward;
        this.form.patchValue({
          city: data.province.id,
          district: data.district.id,
          commune: data.ward.id,
        })
      })
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.form.value.ward_id = this.form.value.commune;
    if (this.aoe == true) {
      this.fileService.getEncodeFromImage(this.file_img).subscribe(data => {
        if (data != null) {
          this.form.value.hinh_anh = data;
        }
        this.shareService.openLoading();
        this.organService.create(this.form.value).subscribe((res: any) => {
          this.shareService.closeLoading();
          this.submitted = false;
          this.loadData({first: this.first, rows: this.rows});
          this.closeModal();
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Thêm cơ quan thành công!"});
        }, err => {
          this.shareService.closeLoading();
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      })
    } else {
      this.fileService.getEncodeFromImage(this.file_img).subscribe(data => {
        if (data != null) {
          this.form.value.hinh_anh = data;
        }
        this.shareService.openLoading();
        this.organService.update(this.form.value).subscribe((res: any) => {
          this.shareService.closeLoading();
          this.submitted = false;
          this.loadData({first: this.first, rows: this.rows});
          this.closeModal();
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Cập nhật cơ quan thành công!"});
        }, err => {
          this.shareService.closeLoading();
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      })
    }
  }

  delete(id) {
    if (confirm("Bạn muốn xóa cơ quan này?")) {
        this.shareService.openLoading();
      this.organService.delete(id).subscribe((res: any) => {
          this.shareService.closeLoading();
        this.loadData({first: this.first, rows: this.rows});
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Xoá cơ quan thành công!"});
      }, err => {
          this.shareService.closeLoading();
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    }
  }

  getDistrict(id) {
    this.listDistrict = [];
    this.listCommune = [];
    this.addressService.getDistrict(id).subscribe((res:any) => {
      this.listDistrict = res.filter(e => {
        return e.deleted_at == null;
      });
      if (this.listDistrict.length != 0) {
        this.form.controls.district.enable();
      }
    })
  }

  getCommune(id) {
    this.listCommune = [];
    this.addressService.getCommune(id).subscribe((res:any) => {
      this.listCommune = res.filter(e => {
        return e.deleted_at == null;
      });
      if (this.listCommune.length != 0) {
        this.form.controls.commune.enable();
      }
    })
  }

  readFileUpload(files) {
    if (files && files[0]) {
      this.file_img = files[0];
    }
  }

  openModal() {
    this.submitted = false;
    $("[data-dismiss=\"fileinput\"]").click();
    $("#myModal").modal("show");
    this.form.reset();
  }

  closeModal() {
    $("#myModal").modal("hide");
  }

  status(event) {
    if (event.target.checked == true) {
      if (confirm("Bạn muốn hiện cơ quan này?")) {
        this.shareService.openLoading();
        this.organService.unDelete(event.target.value).subscribe((res:any) => {
          this.shareService.closeLoading();
          // this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Hiển thị cơ quan thành công!"});
        }, err => {
          this.shareService.closeLoading();
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      } else {
        this.loadData({first: this.first, rows: this.rows});
      }
    } else {
      if (confirm("Bạn muốn ẩn cơ quan này?")) {
        this.shareService.openLoading();
        this.organService.delete(event.target.value).subscribe((res:any) => {
          this.shareService.closeLoading();
          // this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Ẩn cơ quan thành công!"});
        }, err => {
          this.shareService.closeLoading();
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      } else {
        this.loadData({first: this.first, rows: this.rows});
      }
    }
  }
}
