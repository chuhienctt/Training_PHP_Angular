import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QuanLyLinhVucService } from './quan-ly-linh-vuc.service';
import {FileService} from "../lib/file.service";
import {ScriptService} from "../lib/script.service";
import {FileUpload} from "primeng/fileupload";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-quan-ly-linh-vuc',
  templateUrl: './quan-ly-linh-vuc.component.html',
  styleUrls: ['./quan-ly-linh-vuc.component.css']
})
export class QuanLyLinhVucComponent implements OnInit {
  constructor(private linhvuc: QuanLyLinhVucService,  private fileService: FileService) {}
  [x: string]: any;

  @ViewChild('editAndADD', { static: false }) editAndADD: ModalDirective;
  @ViewChild(FileUpload, { static: false }) file: FileUpload
  @ViewChild('editAndADD1', { static: false }) editAndADD1: ModalDirective;
  @ViewChild('editAndADD2', { static: false }) editAndADD2: ModalDirective;
  public entity: any;
  public entity1: any;
  public entity2: any;
  public items: any[];
  public id: bigint;
  public checkedid: any;
  public keyword: string;
  
  ngOnInit(): void {
    this.linhvuc.getList().subscribe((res: any)=>{
      this.items = res;
      console.log(this.items);
    });
    this.loadData();
  }
  createImg(path) {
    return environment.urlImg + "storage/" + path;
  }
  loadData() {
   this.linhvuc.getList().subscribe((res: any) => {
      this.items = res;
      this.items = this.items.filter(item => item.deleted_at == null);
      console.log(this.items);
    });
  } 
  showAdd() {
    this.entity = {};
    this.checkedid = 0;
    this.editAndADD.show();
  }
  showEdit(id) {
    //debugger;
    this.checkedid = 1;
    this.linhvuc.GetSingle(id).subscribe((res) => {
      this.entity2 = res;
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
  //return environment.urlImg + "storage/" + path;
  SaveForm(values: any) {
    if (this.checkedid == 0) {
      this.fileService.getEncodeFromImage(this.file.files[0]).subscribe((data:any) => {
        if (data != null) {
          values.hinh_anh = data;
        }
        
        this.linhvuc.postItme(values).subscribe((res) => {
          if (res) {
            alert('Do you want add this item?');
            this.loadData();
            this.editAndADD.hide();
          }
        });
      })
    };
    if ( this.id = values.id)
    {
      this.linhvuc.editItem(this.id, values).subscribe((res) => {
        alert('Bạn có muốn sửa bản ghi này không?');
        this.loadData();
        this.editAndADD2.hide();
      });
    }
  }
  
  deleteShow(id) {
    if (confirm('Are you sure delete this item?')) {
      this.linhvuc.deleteItem(id).subscribe((res) => {
        this.loadData();
      }, err => {
      });
    }
  }
} 