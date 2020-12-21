import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {ScriptService} from "../../libs/script.service";
import {FeildService} from "../../services/feild.service";
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {OrganService} from "../../services/organ.service";
import {FileService} from "../../libs/file.service";

declare var $:any;

@Component({
  selector: 'app-feild',
  templateUrl: './feild.component.html',
  styleUrls: ['./feild.component.css'],
  providers: [MessageService]
})
export class FeildComponent extends ScriptService implements OnInit {
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
  image:string;
  file_img;
  style = {};

  constructor(
    injetor: Injector,
    private primeConfig: PrimeNGConfig,
    private feildService: FeildService,
    private formBuilder: FormBuilder,
    private organService: OrganService,
    private fileService: FileService,
    private messageService: MessageService
  ) {
    super(injetor)
  }

  ngOnInit(): void {
    this.style = {
      'width': '100%',
      'background-color': '#fff',
      'padding': '0',
      'border-top': '0'
    }

    let elem = document.getElementsByClassName('script');
    if (elem.length != undefined) {
      for (let i = elem.length - 1; 0 <= i; i--) {
        elem[i].remove();
      }
    }
    this.loadScripts();

    this.form = this.formBuilder.group({
      id: [''],
      ten_linh_vuc: ['',[Validators.required, Validators.maxLength(200)]],
      mo_ta: ['',[Validators.maxLength(250)]],
      co_quan: ['']
    })

    this.organService.getAll().subscribe((res:any) => {
      this.listOrgan = res.filter(e => {return e.deleted_at == null});
    })

    this.loadData({first: this.first, rows: this.rows});
  }

  loadData(event) {
    this.first = event.first;
    this.rows = event.rows;
    this.feildService.getData(this.first, this.rows).subscribe((res: any) => {
      this.listFeild = res.data.filter(e => {return e.deleted_at == null});
      this.totalRecords = res.total;
    })
  }

  createImg(path) {
    return environment.urlImg + path;
  }

  create() {
    this.openModal();
    this.aoe = true;
  }

  edit(id) {
    this.openModal();
    this.aoe = false;
    this.feildService.edit(id).subscribe((res:any) => {
      this.form.patchValue({
        id: res.id,
        ten_linh_vuc: res.ten_linh_vuc,
        mo_ta: res.mo_ta,
        co_quan: res.co_quan.map(e => {return e.id})
      })
      this.image = res.hinh_anh;
    })
  }

  onSubmit()  {
    this.submited = true;
    if (this.form.invalid && !this.file_img) {
      return;
    }
    let feild = {
      id: this.form.value.id,
      ten_linh_vuc: this.form.value.ten_linh_vuc,
      mo_ta: this.form.value.mo_ta,
      co_quan: this.form.value.co_quan,
      hinh_anh: null
    }
    if (this.aoe == true) {
      this.fileService.getEncodeFromImage(this.file_img).subscribe((data:any) => {
        if (data != null) {
          feild.hinh_anh = data;
        }
        this.feildService.create(feild).subscribe((res:any) => {
          this.submited = false;
          this.loadData({first: this.first, rows: this.rows});
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Thành công!', detail: "Thêm lĩnh vực thành công!" });
        }, err => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
        })
      })
    } else {
      this.fileService.getEncodeFromImage(this.file_img).subscribe((data:any) => {
        if (data != null) {
          feild.hinh_anh = data;
        }
        this.feildService.update(feild).subscribe((res:any) => {
          this.submited = false;
          this.loadData({first: this.first, rows: this.rows});
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Thành công!', detail: "Cập nhật lĩnh vực thành công!" });
        }, err => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
        })
      })
    }
  }

  delete(id) {
    if (confirm("Bạn muốn xóa lĩnh vực này?")) {
      this.feildService.delete(id).subscribe((res:any) => {
        this.loadData({first: this.first, rows: this.rows});
        this.messageService.add({ severity: 'success', summary: 'Thành công!', detail: "Xoá lĩnh vực thành công!" });
      }, err => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Thất bại!', detail: err.error.message });
      })
    }
  }

  readFileUpload(files) {
    if (files && files[0]) {
      this.file_img = files[0];
    }
  }

  openModal() {
    $('#wizardPicturePreview').attr("src", "assets/img/image_placeholder.jpg");
    this.form.reset();
    $("#myModal").modal("show");
  }

  closeModal() {
    $("#myModal").modal("hide");
  }

}
