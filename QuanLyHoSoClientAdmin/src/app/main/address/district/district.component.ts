import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AddressService} from "../../../services/address.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ScriptService} from "../../../libs/script.service";
import {Location} from "@angular/common";

declare var $:any;

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css'],
  providers: [MessageService]
})
export class DistrictComponent extends ScriptService implements OnInit {
  totalRecords: number;
  first = 0;
  rows = 10;
  listDistrict = [];
  submitted = false;
  aoe: boolean;
  form: FormGroup;

  constructor(
    injector: Injector,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
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
    let id = this.route.snapshot.params['id'];
    this.addressService.paginationDistrict(id, this.first, this.rows).subscribe((res: any) => {
      this.listDistrict = res.data;
      this.totalRecords = res.total;
    })
  }

  edit(id) {
    this.aoe = false;
    $("#myModal").modal("show");
    this.addressService.getDistrictById(id).subscribe((data: any) => {
      this.form.patchValue({
        id: data.id,
        name: data.name,
        type: data.type
      })
    })
  }

  delete(id) {
    if (confirm("Bạn muốn xóa huyện này?")) {
      this.addressService.deleteDistrict(id).subscribe((res: any) => {
        this.loadData({first: this.first, rows: this.rows});
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Xoá huyện thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    }
  }

  create() {
    this.aoe = true;
    $("#myModal").modal("show");
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let district = {
      name: this.form.value.name,
      type: this.form.value.type,
      province_id: this.route.snapshot.params['id']
    }
    if (this.aoe == true) {
      this.addressService.createDistrict(district).subscribe((res: any) => {
        this.submitted = false;
        this.loadData({first: this.first, rows: this.rows});
        $("#myModal").modal("hide");
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Thêm huyện thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    } else {
      this.addressService.updateDistrict(this.form.value.id, district).subscribe((res: any) => {
        this.submitted = false;
        this.loadData({first: this.first, rows: this.rows});
        $("#myModal").modal("hide");
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Sửa huyện thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    }
  }

  redirectCommune(id) {
    this.router.navigate(["/address/commune/", id]);
  }

  redirectCity() {
    this.location.back();
  }

  status(event) {
    if (event.target.checked == true) {
      if (confirm("Bạn muốn hiện huyện này?")) {
        this.addressService.unDeleteDistrict(event.target.value).subscribe((res:any) => {
          // this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Hiển thị huyện thành công!"});
        }, err => {
          console.log(err);
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      } else {
        this.loadData({first: this.first, rows: this.rows});
      }
    } else {
      if (confirm("Bạn muốn ẩn huyện này?")) {
        this.addressService.deleteDistrict(event.target.value).subscribe((res:any) => {
          // this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Ẩn huyện thành công!"});
        }, err => {
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      } else {
        this.loadData({first: this.first, rows: this.rows});
      }
    }
  }

}
