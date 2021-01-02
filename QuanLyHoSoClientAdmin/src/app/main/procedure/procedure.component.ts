import {Component, Injector, OnInit} from '@angular/core';
import {ScriptService} from "../../libs/script.service";
import {ProcedureService} from "../../services/procedure.service";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {OrganService} from "../../services/organ.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {GroupService} from "../../services/group.service";
import {DatePipe} from "@angular/common";

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
  formStep: FormGroup;
  submitted: boolean;
  aoe: boolean;
  aoeProcedure: boolean;
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
  listGroup = [];
  aoeStep: boolean;
  submittedST: boolean;
  pipe = new DatePipe("en-US");

  constructor(
    injector: Injector,
    private procedureService: ProcedureService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private organService: OrganService,
    private groupService: GroupService
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
      ten_thu_tuc: ['', [Validators.required, Validators.maxLength(255)]],
      id_co_quan: ['', [Validators.required]],
      id_linh_vuc: [{value: '', disabled: true}, [Validators.required]],
      muc_do: ['', [Validators.required]],
    })

    this.formProcedure = this.formBuilder.group({
      ten_quy_trinh: ['', [Validators.required, Validators.maxLength(255)]],
      ghi_chu: ['', [Validators.required]],
      template: ['', [Validators.required]],
      ngay_bat_dau: ['', [Validators.required]],
      ngay_ket_thuc: ['']
    })

    this.formStep = this.formBuilder.group({
      ten_buoc: ['', [Validators.required, Validators.maxLength(255)]],
      ghi_chu: ['', [Validators.required]],
      id_nhom: ['', [Validators.required]]
    })

    this.organService.getAll().subscribe((res: any) => {
      this.listOrgan = res;
    })

    this.procedureService.getTemplate().subscribe((res: any) => {
      this.listTemplate = res;
    })

    $('#modalStep2').on('show.bs.modal', function (e) {
      $("#modalStep").modal("hide");
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

  getOrther(id) {
    this.form.controls.id_linh_vuc.enable();
    this.listFeild = [];
    this.organService.edit(id).subscribe((res: any) => {
      this.listFeild = res.linh_vuc;
    })
    this.listGroup = [];
    this.groupService.getGroup(id).subscribe((res: any) => {
      this.listGroup = res.filter(e => {
        return e.deleted_at == null;
      });
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
    this.form.controls.id_linh_vuc.disable();
    this.showModal();
  }

  edit(id) {
    this.aoe = false;
    this.procedure = [];
    this.listStep = [];
    this.showModal();
    this.form.controls.id_linh_vuc.enable();
    this.procedureService.edit(id).subscribe((data: any) => {
      this.form.patchValue({
        id: data.id,
        ten_thu_tuc: data.ten_thu_tuc,
        id_co_quan: data.id_co_quan,
        muc_do: data.muc_do,
        id_linh_vuc: data.id_linh_vuc,
      })
      this.procedure = data.quy_trinh;
      this.getOrther(data.id_co_quan);
    })
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
      this.procedureService.create(this.form.value).subscribe((res: any) => {
        this.submitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công!',
          detail: "Thêm thủ tục thành công!"
        });
        this.hideModal();
        this.loadData({first: this.first, rows: this.rows});
      }, err => {
        console.log(err);
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    } else {
      console.log(this.form.value)
      this.procedureService.update(this.form.value.id, this.form.value).subscribe((res: any) => {
        this.submitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công!',
          detail: "Cập nhật thủ tục thành công!"
        });
        this.hideModal();
        this.loadData({first: this.first, rows: this.rows});
      }, err => {
        console.log(err);
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    }
  }

  delete(id) {
    if (confirm("Bạn muốn xóa thủ tục này?")) {
      this.procedureService.delete(id).subscribe((res: any) => {
        this.loadData({first: this.first, rows: this.rows});
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: "Xóa thủ tục thành công!"});
      }, err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thất bại!', detail: err.error.message});
      })
    }
  }

  createProcedure() {
    this.aoeProcedure = true;
    this.showModalProdure();
  }

  editProcedure(item) {
    this.itemEditProcedure = item;
    this.aoeProcedure = false;
    this.showModalProdure();
    console.log(item)
    this.formProcedure.patchValue({
      ten_quy_trinh: item.ten_quy_trinh,
      ghi_chu: item.ghi_chu,
      template: item.template,
      ngay_bat_dau: new Date(item.ngay_bat_dau),
      ngay_ket_thuc: new Date(item.ngay_ket_thuc)
    })
  }

  deleteProcedure(item) {
    this.procedure.splice(this.procedure.indexOf(item), 1);
  }

  submitProcedure() {
    this.submittedPro = true;
    if (this.formProcedure.invalid) {
      return;
    }
    if (this.aoeProcedure == true) {
      let name = this.procedure.filter(e => {
        return e.ten_quy_trinh == this.formProcedure.value.ten;
      })

      if (name.length == 0) {
        this.procedure.push({
          ten_quy_trinh: this.formProcedure.value.ten_quy_trinh,
          ghi_chu: this.formProcedure.value.ghi_chu,
          template: this.formProcedure.value.template,
          ngay_bat_dau: this.pipe.transform(this.formProcedure.value.ngay_bat_dau, "yyyy-MM-dd"),
          ngay_ket_thuc: this.pipe.transform(this.formProcedure.value.ngay_ket_thuc, "yyyy-MM-dd")
        })
        this.hideModalProcedure();
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công!',
          detail: "Thêm quy trình thành công!"
        });
        this.submittedPro = false;
      } else {
        this.formProcedure.controls.ten_quy_trinh.setErrors({unique: true});
      }
    } else if (this.aoeProcedure == false) {
      this.itemEditProcedure.ten_quy_trinh = this.formProcedure.value.ten_quy_trinh;
      this.itemEditProcedure.ghi_chu = this.formProcedure.value.ghi_chu;
      this.itemEditProcedure.template = this.formProcedure.value.template;
      this.itemEditProcedure.ngay_bat_dau = this.pipe.transform(this.formProcedure.value.ngay_bat_dau, "yyyy-MM-dd");
      this.itemEditProcedure.ngay_ket_thuc = this.pipe.transform(this.formProcedure.value.ngay_bat_dau, "yyyy-MM-dd");
      this.hideModalProcedure();
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công!',
        detail: "Cập nhật quy trình thành công!"
      });
      this.submittedPro = false;
    }
  }

  createStep(item) {
    this.aoeStep = true;
    this.showModalStep();
    this.itemStep = item;
  }

  editStep(item) {
    this.aoeStep = false;
    this.itemEditStep = item;
    this.showModalStep();
    this.formStep.patchValue({
      ten_buoc: item.ten_buoc,
      ghi_chu: item.ghi_chu,
      id_nhom: item.id_nhom
    })
  }

  deleteStep(item) {
    this.itemStep.buoc.splice(this.itemStep.buoc.indexOf(item), 1);
  }

  submitStep() {
    this.submittedST = true;
    if (this.formStep.invalid) {
      return;
    }
    if (this.aoeStep == true) {
      if (!Array.isArray(this.itemStep.buoc)) {
        this.itemStep.buoc = [];
      }

      let nameStep = this.itemStep.buoc.filter(e => {
        return e.ten_buoc == this.formStep.value.ten_buoc;
      })

      if (nameStep.length == 0) {
        this.itemStep.buoc.push({
          ten_buoc: this.formStep.value.ten_buoc,
          ghi_chu: this.formStep.value.ghi_chu,
          id_nhom: this.formStep.value.id_nhom
        })
        this.hideModalStep();
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công!',
          detail: "Thêm bước thành công!"
        });
        this.submittedST = false;
      } else {
        this.formStep.controls.ten_buoc.setErrors({unique: true});
      }
    } else if (this.aoeStep == false) {
      this.itemEditStep.ten_buoc = this.formStep.value.ten_buoc;
      this.itemEditStep.ghi_chu = this.formStep.value.ghi_chu;
      this.itemEditStep.id_nhom = this.formStep.value.id_nhom;
      this.hideModalStep();
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công!',
        detail: "Cập nhật bước thành công!"
      });
      this.submittedST = false;
    }
  }

  showModal() {
    this.submitted = false;
    this.procedure = [];
    this.form.reset();
    $("#exampleModalPreview").modal("show");
  }

  hideModal() {
    $("#exampleModalPreview").modal("hide");
  }

  showModalProdure() {
    this.submittedPro = false;
    this.formProcedure.reset();
    $("#myModal").modal("show");
  }

  hideModalProcedure() {
    $("#myModal").modal("hide");
  }

  showStep(item) {
    $("#modalStep").modal("show");
    this.listStep = item.buoc ?? [];
  }

  hideStep() {
    $("#modalStep").modal("hide");
  }

  showModalStep() {
    this.formStep.reset();
    this.submittedST = false;
    $("#modalStep2").modal("show");
  }

  hideModalStep() {
    $("#modalStep2").modal("hide");
  }
}



