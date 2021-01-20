import { Component, OnInit } from '@angular/core';
import {ListService} from "../../services/list.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  page = 1;
  pageSize = 4;
  listProcedure = [];
  feild:any;
  id: any;
  organ: any;
  form:FormGroup;

  constructor(
    private listService:ListService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.id = params.get('id');
    });
    this.pageChange(this.page);

    this.form = this.formBuilder.group({
      keyword: ['', Validators.required]
    })
  }

  pageChange(page) {
    this.page = page;
    let item = {
      id_linh_vuc: this.id,
      page: page,
      pageSize: this.pageSize
    }
    this.listService.getProcedure(item).subscribe((res:any) => {
      this.feild = res.linh_vuc;
      this.listProcedure = res.data;
      this.organ = res.co_quan;
    })
  }

  search() {
    if (this.form.invalid) {
      return;
    }

    let item = {
      id_linh_vuc: this.id,
      page: this.page,
      pageSize: this.pageSize,
      keyword: this.form.value.keyword
    }
    this.listService.getProcedure(item).subscribe((res:any) => {
      console.log(res)
      this.feild = res.linh_vuc;
      this.listProcedure = res.data;
      this.organ = res.co_quan;
    })
  }

}
