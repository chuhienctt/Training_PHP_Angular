import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {ScriptService} from "../../libs/script.service";
import {FeildService} from "../../services/feild.service";
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FileUpload} from "primeng/fileupload";
import {MultiSelectModule} from 'primeng/multiselect';

declare var $:any;

@Component({
  selector: 'app-feild',
  templateUrl: './feild.component.html',
  styleUrls: ['./feild.component.css'],
  providers: [MessageService]
})
export class FeildComponent extends ScriptService implements OnInit {
  @ViewChild(FileUpload, { static: false }) file: FileUpload
  public Editor = ClassicEditor;
  listFeild = [];
  totalRecords: number;
  loading: boolean;
  aoe: boolean;
  form: FormGroup;
  submited = false;
  listOrgan = [];

  constructor(
    injetor: Injector,
    private primeConfig: PrimeNGConfig,
    private feildService: FeildService,
    private formBuilder: FormBuilder
  ) {
    super(injetor)
  }

  ngOnInit(): void {
    let elem = document.getElementsByClassName('script');
    if (elem.length != undefined) {
      for (let i = elem.length - 1; 0 <= i; i--) {
        elem[i].remove();
      }
    }
    this.loadScripts();

    this.form = this.formBuilder.group({
      ten_linh_vuc: ['',[Validators.required, Validators.maxLength(200)]],
      mo_ta: ['',[Validators.required, Validators.maxLength(200)]],
      id_co_quan: [''],
      hinh_anh: ['', [Validators.required]]
    })
  }

  loadData(event) {
    this.feildService.getData(event.first, event.rows).subscribe((res: any) => {
      console.log(res)
      this.listFeild = res.data;
      this.totalRecords = res.total;
    })
  }

  createImg(path) {
    return "http://localhost:8200/storage" + path;
  }

  create() {
    $("#largeModal").modal("show");
    this.aoe = true;
  }

  onSubmit()  {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }
    if (this.aoe == true) {

    }
  }

}
