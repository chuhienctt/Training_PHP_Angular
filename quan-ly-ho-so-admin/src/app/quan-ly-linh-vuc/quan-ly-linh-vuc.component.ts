import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QuanLyLinhVucService } from './quan-ly-linh-vuc.service';

@Component({
  selector: 'app-quan-ly-linh-vuc',
  templateUrl: './quan-ly-linh-vuc.component.html',
  styleUrls: ['./quan-ly-linh-vuc.component.css']
})
export class QuanLyLinhVucComponent implements OnInit {
  constructor(private typenewService: QuanLyLinhVucService) {}

  items: any[];
  ngOnInit(): void {
    this.typenewService.getList().subscribe((data: any) => {
      this.items = data;
    });
    /*this.typenewService.getList().subscribe((res: any)=>{

      this.items = res;
      console.log(this.items);
    });
    this.loadData();*/
  }
  loadData() {
   /* this.typenewService.getList().subscribe((res: any) => {
      this.items = res;
      console.log(this.items);
    });*/
  } 

} 