import { Component, OnInit } from '@angular/core';
import {HistoryService} from "../../services/history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  listProcedure = [];
  status = 0;
  page = 1;
  pageSize = 10;
  totalRecords: number;

  constructor(
    private historyService: HistoryService
  ) { }

  ngOnInit(): void {
    this.pageChange(this.page);
  }

  pageChange(page) {
    this.page = page;
    this.historyService.getProcedure(this.page, this.pageSize, this.status).subscribe((res:any) => {
      this.listProcedure = res.data;
      this.totalRecords = res.total;
    })
  }

}
