import {Component, Injector, OnInit} from '@angular/core';
import {ScriptService} from "../../libs/script.service";
import {ProcedureService} from "../../services/procedure.service";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {OrganService} from "../../services/organ.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

declare var $: any;

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
  submitted: boolean;
  aoe: boolean;
  aoePro: number;
  listProcedure = [];
  listOrgan = [];
  listFeild = [];
  listTemplate = [];
  procedure = [];
  itemEditProcedure: any;
  itemStep: any;
  itemEditStep: any;
  listStep = [];
  submittedPro: boolean;

  constructor(
    injector: Injector,
    private procedureService: ProcedureService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private organService: OrganService
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
      ten_thu_tuc: ['', [Validators.required, Validators.maxLength(255)]],
      id_co_quan: ['', [Validators.required]],
      id_linh_vuc: [{value: '', disabled: true}, [Validators.required]],
      muc_do: ['', [Validators.required]],
      template: ['', [Validators.required]],
    })

    this.formProcedure = this.formBuilder.group({
      ten: ['', [Validators.required, Validators.maxLength(255)]],
      ghi_chu: ['', [Validators.required]],
    })

    this.organService.getAll().subscribe((res: any) => {
      this.listOrgan = res;
    })

    this.procedureService.getTemplate().subscribe((res: any) => {
      this.listTemplate = res;
    })


    $('#myModal').on('show.bs.modal', e => {
      if (this.aoePro == 4) {
        this.hideModalStep();
      }
    });

    $('#myModal').on('hide.bs.modal', e => {
      if (this.aoePro == 4) {
        this.showModalStep(this.itemStep);
      }
    });
  }

  loadData(event) {
    this.first = event.first;
    this.rows = event.rows;
    this.procedureService.pagination(this.first, this.rows).subscribe((res: any) => {
      this.listProcedure = res.data;
      this.totalRecords = res.total;
    })
  }

  getFeild(event) {
    this.form.controls.id_linh_vuc.enable();
    this.listFeild = [];
    this.organService.edit(event.value).subscribe((res: any) => {
      this.listFeild = res.linh_vuc;
    })
  }

  status(event) {
    if (event.target.checked == true) {
      if (confirm("Bạn muốn hiện thủ tục này?")) {
        this.procedureService.unDelete(event.target.value).subscribe((res: any) => {
          this.loadData({first: this.first, rows: this.rows});
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công!',
            detail: "Hiển thị thủ tục thành công!"
          });
        }, err => {
          console.log(err);
          this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
        })
      } else {
        this.loadData({first: this.first, rows: this.rows});
      }
    } else {
      if (confirm("Bạn muốn ẩn thủ tục này?")) {
        this.procedureService.delete(event.target.value).subscribe((res: any) => {
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
    this.showModal();
  }

  edit(id) {
    this.aoe = false;
    // $("#myModal").modal("show");
  }

  onSubmit() {
    this.submitted = true;
    for (let i = 0; i < this.procedure.length; i++) {
      if (!this.procedure[i].buoc || this.procedure[i].buoc.length == 0) {
        return;
      }
    }
    if (this.form.invalid || this.procedure.length == 0) {
      return;
    }
    this.form.value.quy_trinh = this.procedure;
    if (this.aoe == true) {
      this.procedureService.create(this.form.value).subscribe((res:any) => {
        this.submitted = false;
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Thêm thủ tục thành công!"});
        this.hideModal();
        this.loadData({first: this.first, rows: this.rows});
      })
    }
  }

  delete(id) {
  }

  showModal() {
    this.procedure = [];
    this.form.reset();
    $("#exampleModalPreview").modal("show");
  }

  hideModal() {
    $("#exampleModalPreview").modal("hide");
  }

  showModalProdure() {
    this.formProcedure.reset();
    $("#myModal").modal("show");
  }

  hideModalProcedure() {
    $("#myModal").modal("hide");
  }

  createProcedure() {
    this.aoePro = 1;
    this.showModalProdure();
  }

  editProcedure(item) {
    this.itemEditProcedure = item;
    this.aoePro = 2;
    this.showModalProdure();
    this.formProcedure.patchValue({
      ten: item.ten_quy_trinh,
      ghi_chu: item.ghi_chu
    })
  }

  deleteProcedure(item) {
    this.procedure.splice(this.procedure.indexOf(item), 1);
  }

  createStep(item) {
    this.aoePro = 3;
    this.showModalProdure();
    this.itemStep = item;
  }

  editStep(item) {
    this.aoePro = 4;
    this.itemEditStep = item;
    this.showModalProdure();
    this.formProcedure.patchValue({
      ten: item.ten_buoc,
      ghi_chu: item.ghi_chu
    })
  }

  deleteStep(item) {
    this.itemStep.buoc.splice(this.itemStep.buoc.indexOf(item), 1);
  }

  showModalStep(item) {
    $("#modalStep").modal("show");
    this.listStep = item.buoc ?? [];
  }

  hideModalStep() {
    $("#modalStep").modal("hide");
  }

  submitProcedure() {
    this.submittedPro = true;
    if (this.formProcedure.invalid) {
      return;
    }
    if (this.aoePro == 1) {
      let name = this.procedure.filter(e => {
        return e.ten_quy_trinh == this.formProcedure.value.ten;
      })

      if (name.length == 0) {
        this.procedure.push({
          ten_quy_trinh: this.formProcedure.value.ten,
          ghi_chu: this.formProcedure.value.ghi_chu
        })
        this.hideModalProcedure();
        this.submittedPro = false;
      } else {
        this.formProcedure.controls.ten.setErrors({unique: true});
      }
    } else if (this.aoePro == 2) {
      this.itemEditProcedure.ten_quy_trinh = this.formProcedure.value.ten;
      this.itemEditProcedure.ghi_chu = this.formProcedure.value.ghi_chu;
      this.hideModalProcedure();
      this.submittedPro = false;
    } else if (this.aoePro == 3) {
      if (!Array.isArray(this.itemStep.buoc)) {
        this.itemStep.buoc = [];
      }

      let nameStep = this.itemStep.buoc.filter(e => {
        return e.ten_buoc == this.formProcedure.value.ten;
      })

      if (nameStep.length == 0) {
        this.itemStep.buoc.push({
          ten_buoc: this.formProcedure.value.ten,
          ghi_chu: this.formProcedure.value.ghi_chu
        })
        this.hideModalProcedure();
        this.submittedPro = false;
        console.log(this.procedure)
      } else {
        this.formProcedure.controls.ten.setErrors({unique: true});
      }
    } else if (this.aoePro == 4) {
      this.itemEditStep.ten_buoc = this.formProcedure.value.ten;
      this.itemEditStep.ghi_chu = this.formProcedure.value.ghi_chu;
      this.hideModalProcedure();
      this.submittedPro = false;
    }
  }
}



