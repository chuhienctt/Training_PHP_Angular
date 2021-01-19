import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QuanLyCoQuanService } from '../_services/quan-ly-co-quan.service';
import { FileService } from '../lib/file.service';
import { ScriptService } from '../lib/script.service';
import { FileUpload } from 'primeng/fileupload';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'primeng/api';
import { AddressService} from '../_services/adress.service';
import { QuanLyLinhVucService } from '../_services/quan-ly-linh-vuc.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-quan-ly-linh-vuc',
  templateUrl: './quan-ly-linh-vuc.component.html',
  styleUrls: ['./quan-ly-linh-vuc.component.css'],
  providers: [MessageService],
})
export class QuanLyLinhVucComponent implements OnInit {
  constructor(
    
    private router: Router,
    private coquan: QuanLyCoQuanService,
    private fileService: FileService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private linhvuc: QuanLyLinhVucService,
    // private linhvuc: QuanLyLinhVucService,
    // private coquan: CoquanService,
    // private fileService: FileService,
    // private formBuilder: FormBuilder,
    // private messageService: MessageService
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
  public id: bigint;
  public checkedid: any;
  public keyword: string;
  public form: FormGroup;
  listCoquan = [];
  first = 0;
  rows = 10;
  totalRecords: number;

  ngOnInit(): void {
    this.loadData({ first: this.first, rows: this.rows });

    this.form = this.formBuilder.group({
      code: ['', [Validators.required]],
      ten_linh_vuc: ['', [Validators.required]],
      mo_ta: ['', [Validators.required]],
      co_quan: ['', [Validators.required]],
      hinh_anh: ['', [Validators.required]],
    });

    this.coquan.getList().subscribe((res: any) => {
    this.listCoquan = res.filter(e => {return e.deleted_at == null});
    })
  }

  logout()
  {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login1']);
  }

  createImg(path) {
    return environment.urlImg + 'storage/' + path;
  }
  
  loadData(event) {
    this.first = event.first;
    this.rows = event.rows;
    this.linhvuc.getData(this.first, this.rows).subscribe((res: any) => {
      this.items = res.data;
      this.items = this.items.filter((item) => item.deleted_at == null);
      this.totalRecords = res.total;
    });
  }

  showAdd() {
    this.entity = {};
    this.checkedid = 0;
    this.form.reset();
    this.editAndADD.show();
  }
 
  showEdit(id) {
    this.checkedid = 1;
    this.id = id;
    this.linhvuc.GetSingle(id).subscribe((res) => {
      this.form.patchValue({
        id: res.id,
        code:res.code,
        ten_linh_vuc:res.ten_linh_vuc,
        mo_ta:res.mo_ta,
        // co_quan:res.co_quan,
        co_quan:res.co_quan.map(cq => { return cq.id; }),
        //hinh_anh:res.hinh_anh,
      })
      console.log(res);
      
      // this.entity = res;
    });
    this.editAndADD2.show();
  }

  showDetail(id) {
    //debugger;
    this.checkedid = 1;
    this.linhvuc.GetSingle(id).subscribe((res) => {
      this.entity1 = res;
    });
    this.editAndADD1.show();
  }

  SaveForm() {
    console.log(this.form.value);
    let organ = {
      code: this.form.value.code,
      ten_linh_vuc: this.form.value.ten_linh_vuc,
      co_quan: this.form.value.co_quan,
      mo_ta: this.form.value.mo_ta,
      hinh_anh: null,
    };
    this.iSubmited = true;
    if (this.checkedid == 0) {
      this.fileService
        .getEncodeFromImage(this.file.files[0])
        .subscribe((data: any) => {
          if (data != null) {
            organ.hinh_anh = data;

            this.linhvuc.postItme(organ).subscribe(
              (res) => {
                //console.log('ok');
                if (res) {
                  alert('Đã thêm bản ghi lĩnh vực');
                  this.loadData({ first: this.first, rows: this.rows });
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
    }  else
     {
      this.fileService
        .getEncodeFromImage(this.file.files[0])
        .subscribe((data: any) => {
          if (data != null) {
            organ.hinh_anh = data;
          }
          if (confirm('Bạn muốn sửa bản ghi cơ quan ?')) {
            console.log(1, organ);
            
            this.linhvuc.editItem(this.id, organ).subscribe(
              (res) => { 
                this.loadData({ first: this.first, rows: this.rows });
                this.editAndADD2.hide();
                this.messageService.add({
                  severity: 'success',
                  summary: 'Thành công!',
                  detail: 'Sửa cơ quan thành công!',
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
        });
    }
  }

  deleteShow(id) {
    if (confirm('Bạn chắc chắn muốn xóa bản ghi này?.')) {
      this.linhvuc.deleteItem(id).subscribe(
        (res) => {
          this.loadData({ first: this.first, rows: this.rows });
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công!',
            detail: 'Xoá cơ quan thành công!',
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
  }
}
