import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressService} from "../../../services/address.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ScriptService} from "../../../libs/script.service";
import { ShareService } from 'src/app/services/share.service';

declare var $: any;

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [MessageService]
})
export class CityComponent extends ScriptService implements OnInit {
  totalRecords: number;
  first = 0;
  rows = 10;
  listCity = [];
  submitted = false;
  aoe: boolean;
  form: FormGroup;

  constructor(
    injector: Injector,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private shareService: ShareService
  ) {
    super(injector)
  }

  ngOnInit(): void {
    let elem = document.getElementsByClassName('script');
    if (elem.length != undefined) {
      for (let i = elem.length - 1; 0 <= i; i--) {
        elem[i].remove();
      }
    }
    this.loadScripts();

    this.loadData({first: this.first, rows: this.rows});

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(45)]],
      type: ['', [Validators.required]]
    })
  }

  loadData(event) {
    this.first = event.first;
    this.rows = event.rows;
    this.addressService.paginationCity(this.first, this.rows).subscribe((res: any) => {
      this.listCity = res.data;
      this.totalRecords = res.total;
    })
  }

  edit(id) {
    this.submitted = false;
    this.aoe = false;
    $("#myModal").modal("show");
    this.addressService.getCity(id).subscribe((data: any) => {
      this.form.patchValue({
        id: data.id,
        name: data.name,
        type: data.type
      })
    })
  }

  delete(id) {
    if (confirm("Bạn muốn xóa tỉnh này?")) {
      this.shareService.openLoading();
      this.addressService.deleteCity(id).subscribe((res: any) => {
        this.loadData({first: this.first, rows: this.rows});
        this.shareService.closeLoading();
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Xoá tỉnh thành công!"});
      }, err => {
        this.shareService.closeLoading();
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    }
  }

  create() {
    this.submitted = false;
    this.form.reset();
    this.aoe = true;
    $("#myModal").modal("show");
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.aoe == true) {
      this.shareService.openLoading();
      this.addressService.createCity(this.form.value).subscribe((res: any) => {
        this.shareService.closeLoading();
        this.submitted = false;
        this.loadData({first: this.first, rows: this.rows});
        $("#myModal").modal("hide");
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Thêm tỉnh thành công!"});
      }, err => {
        this.shareService.closeLoading();
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    } else {
      this.shareService.openLoading();
      this.addressService.updateCity(this.form.value.id, this.form.value).subscribe((res: any) => {
        this.shareService.closeLoading();
        this.submitted = false;
        this.loadData({first: this.first, rows: this.rows});
        $("#myModal").modal("hide");
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Sửa tỉnh thành công!"});
      }, err => {
        this.shareService.closeLoading();
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    }
  }

  redirectDistrict(id) {
    this.router.navigate(["/address/district/", id]);
  }

  status(event) {
    if (event.target.checked == true) {
      if (confirm("Bạn muốn hiện tỉnh này?")) {
        this.shareService.openLoading();
        this.addressService.unDeleteCity(event.target.value).subscribe((res:any) => {
          this.shareService.closeLoading();
          // this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Hiển thị tỉnh thành công!"});
        }, err => {
          this.shareService.closeLoading();
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      } else {
        this.loadData({first: this.first, rows: this.rows});
      }
    } else {
      if (confirm("Bạn muốn ẩn tỉnh này?")) {
        this.shareService.openLoading();
        this.addressService.deleteCity(event.target.value).subscribe((res:any) => {
          this.shareService.closeLoading();
          // this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Ẩn tỉnh thành công!"});
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
