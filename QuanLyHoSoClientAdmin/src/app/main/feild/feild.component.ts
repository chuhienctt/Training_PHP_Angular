import {Component, Injector, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {ScriptService} from "../../libs/script.service";
import {FeildService} from "../../services/feild.service";

@Component({
  selector: 'app-feild',
  templateUrl: './feild.component.html',
  styleUrls: ['./feild.component.css'],
  providers: [MessageService]
})
export class FeildComponent extends ScriptService implements OnInit {
  listFeild = [];
  totalRecords: number;
  loaing: boolean;

  constructor(
    injetor: Injector,
    private feildService: FeildService) {
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
  }

  loadData(event) {
    this.feildService.getData(event.first, event.rows).subscribe((res:any) => {
      console.log(res);
    })
  }

}
