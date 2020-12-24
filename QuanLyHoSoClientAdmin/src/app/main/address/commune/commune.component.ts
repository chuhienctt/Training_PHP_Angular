import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressService} from "../../../services/address.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {ScriptService} from "../../../libs/script.service";
import {Location} from "@angular/common";

declare var $:any;

@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.css'],
  providers: [MessageService]
})
export class CommuneComponent extends ScriptService implements OnInit {
  totalRecords: number;
  first = 0;
  rows = 10;
  listCommune = [];
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
    this.addressService.paginationCommune(id, this.first, this.rows).subscribe((res: any) => {
      this.listCommune = res.data;
      this.totalRecords = res.total;
    })
  }

  edit(id) {
    this.aoe = false;
    $("#myModal").modal("show");
    this.addressService.getCommuneById(id).subscribe((data: any) => {
      this.form.patchValue({
        id: data.id,
        name: data.name,
        type: data.type
      })
    })
  }

  delete(id) {
    if (confirm("Bạn muốn xóa xã này?")) {
      this.addressService.deleteCommune(id).subscribe((res: any) => {
        this.loadData({first: this.first, rows: this.rows});
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Xoá xã thành công!"});
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

    let commune = {
      name: this.form.value.name,
      type: this.form.value.type,
      district_id: this.route.snapshot.params['id']
    }
    if (this.aoe == true) {
      this.addressService.createCommune(commune).subscribe((res: any) => {
        this.submitted = false;
        this.loadData({first: this.first, rows: this.rows});
        $("#myModal").modal("hide");
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Thêm xã thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    } else {
      this.addressService.updateCommune(this.form.value.id, commune).subscribe((res: any) => {
        this.submitted = false;
        this.loadData({first: this.first, rows: this.rows});
        $("#myModal").modal("hide");
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Sửa xã thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    }
  }

  redirectDistrict() {
    this.location.back();
  }

  status(event) {
    if (event.target.checked == true) {
      if (confirm("Bạn muốn hiện xã này?")) {
        this.addressService.unDeleteCommune(event.target.value).subscribe((res:any) => {
          // this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Hiển thị xã thành công!"});
        }, err => {
          console.log(err);
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      } else {
        this.loadData({first: this.first, rows: this.rows});
      }
    } else {
      if (confirm("Bạn muốn ẩn xã này?")) {
        this.addressService.deleteCommune(event.target.value).subscribe((res:any) => {
          // this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Ẩn xã thành công!"});
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
