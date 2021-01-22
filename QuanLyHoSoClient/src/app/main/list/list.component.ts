import {Component, Injector, OnInit} from '@angular/core';
import {ListService} from "../../services/list.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ScriptService} from "../../../../../QuanLyHoSoClientAdmin/src/app/libs/script.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  page = 1;
  pageSize = 10;
  listProcedure = [];
  feild:any;
  organ: any;
  lever: any;
  totalRecords: number;
  form:FormGroup;
  arr = [];
  id = "";
  muc_do = "";
  id_co_quan = "";

  constructor(
    private listService:ListService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      keyword: [''],
      id_co_quan: [''],
      id_linh_vuc: [''],
      muc_do: [''],
    })

    this.pageChange(this.page);
    this.getAllFeild();
    this.getAllOrgan();
  }

  getAllFeild() {
    this.listService.getAllFeild().subscribe(res => {
      this.feild = res;
    })
  }

  getAllOrgan() {
    this.listService.getAllOrgan().subscribe(res => {
      this.organ = res;
    })
  }

  pageChange(page) {
    this.page = page;
    this.listService.getProcedure(this.page, this.pageSize, this.form.value.id_linh_vuc, this.form.value.id_co_quan, this.form.value.muc_do, this.form.value.keyword).subscribe((res:any) => {
      this.listProcedure = res.data;
      this.totalRecords = res.total;
    })
  }

  onSubmit() {
    this.pageChange(this.page);
  }

  filterByOrgan(id_co_quan) {
    this.form.patchValue({
      id_co_quan: String(id_co_quan)
    })
    this.form.value.id_linh_vuc = "";
    this.pageChange(this.page);
  }

  filterByFeild(id_linh_vuc) {
    this.form.patchValue({
      id_linh_vuc: id_linh_vuc
    })
    this.pageChange(this.page);
  }

  getFeild(event) {
    console.log(event.target.value)
    this.form.value.id_linh_vuc = "";
    if (!event.target.value) {
      this.getAllFeild();
    } else {
      this.listService.getFeild(event.target.value).subscribe((res:any) => {
        this.feild = res.linh_vuc;
      })
    }
  }

}
