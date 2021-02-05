import { Component, OnInit } from '@angular/core';
import {HistoryService} from "../../services/history.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.css']
})
export class SearchProfileComponent implements OnInit {
  form:FormGroup;
  profile:any;

  constructor(
    private historyService: HistoryService,
    private formBuider: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuider.group({
      code: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }

    this.historyService.search(this.form.value.code).subscribe((res:any) => {
      console.log(res)
      this.profile = res;
    }, err => {
      console.log(err)
    })
  }

}
