import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QuanLyCoQuanService } from './quan-ly-co-quan.service';
import { FileService } from '../lib/file.service';
import { ScriptService } from '../lib/script.service';
import { FileUpload } from 'primeng/fileupload';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'primeng/api';
import { AddressService} from '../_services/adress.service';
import { LinhvucService} from '../_services/linhvuc.service';


@Component({
  selector: 'app-quan-ly-co-quan',
  templateUrl: './quan-ly-co-quan.component.html',
  styleUrls: ['./quan-ly-co-quan.component.css'],
  providers: [MessageService],
})
export class QuanLyCoQuanComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(
    private coquan: QuanLyCoQuanService,
    private fileService: FileService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private adressService: AddressService,
    private linhvuc: LinhvucService,

  ) {}
  [x: string]: any;

  @ViewChild('editAndADD', { static: false }) editAndADD: ModalDirective;
  @ViewChild(FileUpload, { static: false }) file: FileUpload;
  @ViewChild('editAndADD1', { static: false }) editAndADD1: ModalDirective;
  @ViewChild('editAndADD2', { static: false }) editAndADD2: ModalDirective;
  public entity: any;
  public entity1: any;
  public entity2: any;
  public items: any[];
  public items1: any[]; 
  public form: FormGroup;
  public id: bigint;
  public checkedid: any;
  public keyword: string;
  listCity = [];
  listDistrict = [];
  listCommune = [];
  listLinhvuc=[];

  ngOnInit(): void {
    this.coquan.getList().subscribe((res: any) => {
      this.items = res;
      console.log(this.items);
    });
    this.loadData();

    this.form = this.formBuilder.group({
      ten_co_quan: ['', [Validators.required]],
      dia_chi: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(8),
          Validators.maxLength(100),
        ],
      ],
      so_dien_thoai: ['', [Validators.required]],
      mo_ta: ['', [Validators.required]],
      hinh_anh: ['', [Validators.required]],
      city: ['', [Validators.required]],
      linh_vuc: ['', [Validators.required]],
      district: ['', [Validators.required]],
      commune: ['', [Validators.required]],
    });

    this.adressService.getProvince().subscribe((res: any) => {
      this.listCity = res;
    });

    // this.linhvuc.getList().subscribe((res: any) => {
    //   this.listLinhvuc = res;
    // });

    this.linhvuc.getList().subscribe((res: any) => {
      this.listLinhvuc = res.filter(e => {return e.deleted_at == null});
    })
  }

  getDistrict(val) {
    // console.log(val);
    
    this.listDistrict = [];
    this.listCommune = [];
    this.adressService.getDistrict(val.id).subscribe((res: any) => {
      this.listDistrict = res;
      console.log(res);
      
      if (this.listDistrict.length != 0) {
        this.form.controls.district.enable();
      }
    });
  }

  getCommune(val) {
    this.listCommune = [];
    this.adressService.getCommune(val.id).subscribe((res: any) => {
      this.listCommune = res;
      if (this.listCommune.length != 0) {
        this.form.controls.commune.enable();
      }
    });
  }

  createImg(path) {
    return environment.urlImg + 'storage/' + path;
  }
  loadData() {
    this.coquan.getList().subscribe((res: any) => {
      this.items = res;
      //this.listCity = res;
      this.items = this.items.filter((item) => item.deleted_at == null);
    });
  }

  showAdd() {
    this.entity = {};
    this.checkedid = 0;
    this.editAndADD.show();
  }


  showEdit(id) {
    this.checkedid = 1;
    this.id = id;
    this.coquan.GetSingle(id).subscribe((res) => {
      this.form.patchValue({
        ten_co_quan:res.ten_co_quan,
        dia_chi:res.dia_chi,
        email:res.email,
        so_dien_thoai:res.so_dien_thoai,
        linh_vuc:res.linh_vuc,
        
      })
      this.adressService.getAddress(res.ward_id).subscribe((data:any)=>{
        this.listCity=data.list_province;
        this.listDistrict=data.list_district;
        this.listCommune=data.list_ward;
        this.form.patchValue({
          city:this.province.id,
          district:this.district.id,
          commune:this.ward.id
        })
      })
      // console.log(res);
      
      // this.entity = res;
    });
    this.editAndADD2.show();
  }


  showDetail(id) {
    //debugger;
    this.checkedid = 1;
    this.coquan.GetSingle(id).subscribe((res) => {
      this.entity1 = res;
    });
    this.editAndADD1.show();
  }



  SaveForm() {
    // console.log(this.form.value);
    let organ = {
      ten_co_quan: this.form.value.ten_co_quan,
      dia_chi: this.form.value.dia_chi,
      hinh_anh: null,
      so_dien_thoai: this.form.value.so_dien_thoai,
      email: this.form.value.email,
      mo_ta: this.form.value.mo_ta,
      linh_vuc: this.form.value.linh_vuc,
      ward_id: this.form.value.commune,

    }
    this.iSubmited = true;
    if (this.checkedid == 0) {
      this.fileService
        .getEncodeFromImage(this.file.files[0])
        .subscribe((data: any) => {
          if (data != null) {
            organ.hinh_anh = data;
            console.log(organ);
            
            this.coquan.postItme(organ).subscribe((res) => {
              //console.log('ok');
                  if (res) {
                    alert('Đã thêm bản ghi lĩnh vực');
                    this.loadData();
                    this.editAndADD.hide();
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Thành công!',
                      detail: 'Thêm lĩnh vực thành công!',
                    });
                  }
                },
                (err) => {
                  if (err.status != 1) {
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Thất bại!',
                      detail: err.error.message,
                    });
                  }
                }
              );
          }
        });
    } else {
      this.fileService
        .getEncodeFromImage(this.file.files[0])
        .subscribe((data: any) => {
          if (data != null) {
            organ.hinh_anh = data;
          }
          if (confirm('Bạn muốn sửa bản ghi cơ quan ?')) {
            this.coquan.editItem(this.id, organ).subscribe(
              (res) => {
                this.loadData();
                this.editAndADD2.hide();
                this.messageService.add({
                  severity: 'success',
                  summary: 'Thành công!',
                  detail: 'Sửa cơ quan thành công!',
                });
              },
              (err) => {
                if (err.status != 1) {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Thất bại!',
                    detail: err.error.message,
                  });
                }
              }
            );
          }
        });
    }
  }

  deleteShow(id) {
    if (confirm('Bạn chắc chắn muốn xóa bản ghi này?.')) {
      this.coquan.deleteItem(id).subscribe(
        (res) => {
          this.loadData();
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công!',
            detail: 'Xoá cơ quan thành công!',
          });
        },
        (err) => {
          console.log(err);
          
          if (err.status != 1) {
            this.messageService.add({
              severity: 'error',
              summary: 'Thất bại!',
              detail: err.error.message,
            });
          }
        }
      );
    }
  }
}

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-quan-ly-co-quan',
//   templateUrl: './quan-ly-co-quan.component.html',
//   styleUrls: ['./quan-ly-co-quan.component.css']
// })
// export class QuanLyCoQuanComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
