import {Component, Injector, OnInit} from '@angular/core';
import {ScriptService} from "../libs/script.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends ScriptService implements OnInit {

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit(): void {
    this.loadScripts();
  }

}
