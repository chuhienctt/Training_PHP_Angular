import { Component, OnInit } from '@angular/core';
import {DetailService} from "../../services/detail.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  procedure:any;

  constructor(
    private detailService: DetailService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail() {
    this.detailService.getDetail(this.route.snapshot.params['id']).subscribe((res:any) => {
      console.log(res)
      this.procedure = res;
    })
  }

  getDays(time) {
    let day = Math.floor(time / 86400);
    return day;
  }

}
