import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressService} from "../../../services/address.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {ScriptService} from "../../../libs/script.service";
import {OrganService} from "../../../services/organ.service";
import {GroupService} from "../../../services/group.service";
import {UserService} from "../../../services/user.service";

declare var $:any;

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [MessageService]
})
export class GroupComponent extends ScriptService implements OnInit {
  totalRecords: number;
  first = 0;
  rows = 10;
  listGroup = [];
  submitted = false;
  aoe: boolean;
  form: FormGroup;
  listOrgan = [];
  listUser1 = [];
  listUser2 = [];

  constructor(
    injector: Injector,
    private organService: OrganService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private groupService: GroupService,
    private userService: UserService
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
      ten_nhom: ['', [Validators.required, Validators.maxLength(255)]],
      id_co_quan: ['', [Validators.required]]
    })

    this.organService.getAll().subscribe((res:any) => {
      this.listOrgan = res.filter(e => {
        return e.deleted_at == null;
      });
    })
  }

  loadData(event) {
    this.first = event.first;
    this.rows = event.rows;
    this.groupService.pagination(this.first, this.rows).subscribe((res: any) => {
      this.listGroup = res.data;
      this.totalRecords = res.total;
    })
  }

  getUser(id_co_quan) {
    this.userService.getUser(id_co_quan).subscribe((res:any) => {
      this.listUser1 = res.filter(e => {
        return e.deleted_at == null && e.role == 2 && this.listUser2.filter(x => { return x.id == e.id}).length == 0;
      });
    })
  }

  edit(id) {
    this.submitted = false;
    this.form.controls.id_co_quan.disable();
    this.aoe = false;
    $("#myModal").modal("show");
    this.groupService.get(id).subscribe((data:any) => {
      this.form.patchValue({
        id: data.id,
        ten_nhom: data.ten_nhom,
        id_co_quan: data.id_co_quan,
      })
      this.listUser2 = data.users;
      this.getUser(data.id_co_quan);
    })
  }

  delete(id) {
    if (confirm("Bạn muốn xóa nhóm này?")) {
      this.groupService.delete(id).subscribe((res: any) => {
        this.loadData({first: this.first, rows: this.rows});
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Xoá nhóm thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    }
  }

  create() {
    this.submitted = false;
    this.form.controls.id_co_quan.enable();
    this.form.reset();
    this.aoe = true;
    $("#myModal").modal("show");
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid || this.listUser2.length == 0) {
      return;
    }

    this.form.value.users = this.listUser2.map(e => {
      return e.id;
    });
    if (this.aoe == true) {
      this.groupService.create(this.form.value).subscribe((res: any) => {
        this.submitted = false;
        this.loadData({first: this.first, rows: this.rows});
        $("#myModal").modal("hide");
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Thêm nhóm thành công!"});
      }, err => {
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    } else {
      this.groupService.update(this.form.value).subscribe((res: any) => {
        this.submitted = false;
        this.loadData({first: this.first, rows: this.rows});
        $("#myModal").modal("hide");
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Sửa nhóm thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    }
  }

  status(event) {
    if (event.target.checked == true) {
      if (confirm("Bạn muốn hiện nhóm này?")) {
        this.groupService.unDelete(event.target.value).subscribe((res:any) => {
          // this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Hiển thị nhóm thành công!"});
        }, err => {
          console.log(err);
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      } else {
        this.loadData({first: this.first, rows: this.rows});
      }
    } else {
      if (confirm("Bạn muốn ẩn nhóm này?")) {
        this.groupService.delete(event.target.value).subscribe((res:any) => {
          // this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Ẩn nhóm thành công!"});
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
