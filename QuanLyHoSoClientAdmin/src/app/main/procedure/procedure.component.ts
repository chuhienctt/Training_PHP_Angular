import {Component, Injector, OnInit} from '@angular/core';
import {ScriptService} from "../../libs/script.service";
import {ProcedureService} from "../../services/procedure.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

declare var $:any;

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css'],
  providers: [MessageService]
})
export class ProcedureComponent extends ScriptService implements OnInit {
  first = 0;
  rows = 10;
  totalRecords: number;
  form: FormGroup;
  submitted: boolean;
  aoe: boolean;
  listProcedure = [];
  listOrgan = [];
  listFeild = [];

  constructor(
    injector: Injector,
    private procedureService: ProcedureService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {super(injector)}

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
      ten_thu_tuc: ['', [Validators.required, Validators.maxLength(255)]],
      id_co_quan: ['', [Validators.required]],
      id_linh_vuc: ['', [Validators.required]],
      muc_do: ['', [Validators.required]],
      template: ['', [Validators.required]],
    })
  }

  loadData(event) {
    this.first = event.first;
    this.rows = event.rows;
    this.procedureService.pagination(this.first, this.rows).subscribe((res:any) => {
      this.listProcedure = res.data;
      this.totalRecords = res.total;
      console.log(res)
    })
  }

  // status(event) {
  //   if (event.target.checked == true) {
  //     if (confirm("Bạn muốn hiện thủ tục này?")) {
  //       this.procedureService.unDelete(event.target.value).subscribe((res:any) => {
  //         this.loadData({first: this.first, rows: this.rows});
  //         this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Hiển thị thủ tục thành công!"});
  //       }, err => {
  //         console.log(err);
  //         this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
  //       })
  //     } else {
  //       this.loadData({first: this.first, rows: this.rows});
  //     }
  //   } else {
  //     if (confirm("Bạn muốn ẩn thủ tục này?")) {
  //       this.procedureService.delete(event.target.value).subscribe((res:any) => {
  //         this.loadData({first: this.first, rows: this.rows});
  //         this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Ẩn thủ tục thành công!"});
  //       }, err => {
  //         this.loadData({first: this.first, rows: this.rows});
  //         this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
  //       })
  //     } else {
  //       this.loadData({first: this.first, rows: this.rows});
  //     }
  //   }
  // }

  create() {
    this.aoe = true;
    $("#myModal").modal("show");
  }

  edit(id) {
    this.aoe = false;
  }

  onSubmit() {
    this.submitted = false;
    if (this.form.invalid) {
      return;
    }
  }

  delete(id) {}

}
