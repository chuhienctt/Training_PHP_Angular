import {Component, Injector, OnInit} from '@angular/core';
import {ScriptService} from "../../libs/script.service";
import {ProcedureService} from "../../services/procedure.service";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {OrganService} from "../../services/organ.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

declare var $:any;

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css'],
  providers: [MessageService]
})
export class ProcedureComponent extends ScriptService implements OnInit {
  public Editor = ClassicEditor;
  first = 0;
  rows = 10;
  totalRecords: number;
  form: FormGroup;
  formProcedure: FormGroup;
  formStep: FormGroup;
  submitted: boolean;
  aoe: boolean;
  listProcedure = [];
  listOrgan = [];
  listFeild = [];
  listTemplate = [];

  constructor(
    injector: Injector,
    private procedureService: ProcedureService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private organService: OrganService
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
      id_linh_vuc: [{value: '', disabled: true}, [Validators.required]],
      muc_do: ['', [Validators.required]],
      template: ['', [Validators.required]]
    })

    this.formProcedure = this.formBuilder.group({
      ten_quy_trinh: ['', [Validators.required, Validators.maxLength(255)]],
      ghi_chu: ['', [Validators.required]]
    })

    this.formStep = this.formBuilder.group({
      ten_buoc: ['', [Validators.required, Validators.maxLength(255)]],
      ghi_chu: ['', [Validators.required]]
    })

    this.organService.getAll().subscribe((res:any) => {
      this.listOrgan = res;
    })

    this.procedureService.getTemplate().subscribe((res:any) => {
      this.listTemplate = res;
    })

    $("#modalProcedure").on("hide.bs.modal",  (e) => {
      this.showModal();
    })

    $("#modalStep").on("hide.bs.modal",  (e) => {
      this.showProcedure();
    })
  }

  loadData(event) {
    this.first = event.first;
    this.rows = event.rows;
    this.procedureService.pagination(this.first, this.rows).subscribe((res:any) => {
      this.listProcedure = res.data;
      this.totalRecords = res.total;
    })
  }

  getFeild(event) {
    this.form.controls.id_linh_vuc.enable();
    this.organService.edit(event.value).subscribe((res:any) => {
      this.listFeild = res.linh_vuc;
    })
  }

  status(event) {
    if (event.target.checked == true) {
      if (confirm("Bạn muốn hiện thủ tục này?")) {
        this.procedureService.unDelete(event.target.value).subscribe((res:any) => {
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Hiển thị thủ tục thành công!"});
        }, err => {
          console.log(err);
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      } else {
        this.loadData({first: this.first, rows: this.rows});
      }
    } else {
      if (confirm("Bạn muốn ẩn thủ tục này?")) {
        this.procedureService.delete(event.target.value).subscribe((res:any) => {
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Ẩn thủ tục thành công!"});
        }, err => {
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      } else {
        this.loadData({first: this.first, rows: this.rows});
      }
    }
  }

  create() {
    this.aoe = true;
    this.form.reset();
    this.showModal();
  }

  edit(id) {
    this.aoe = false;
    $("#myModal").modal("show");
  }

  onSubmit() {
    this.submitted = false;
    if (this.form.invalid) {
      return;
    }
  }

  createProcedure() {
    this.hideModal();
    this.showProcedure();
  }

  createStep() {
    this.hideProcedure();
    this.hideModal();
    this.showStep();
  }

  delete(id) {}

  showModal() {
    $("#myModal").modal("show");
  }

  hideModal() {
    $("#myModal").modal("hide");
  }

  showProcedure() {
    $("#modalProcedure").modal("show");
  }

  hideProcedure() {
    $("#modalProcedure").modal("hide");
  }

  showStep() {
    $("#modalStep").modal("show");
  }

  hideStep() {
    $("#modalStep").modal("hide");
  }

}
