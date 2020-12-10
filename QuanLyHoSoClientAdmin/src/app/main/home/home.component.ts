import { Component, Injector, OnInit } from '@angular/core';
import { ScriptService } from "../../libs/script.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent extends ScriptService implements OnInit {

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit(): void {
    this.loadScripts();
  }

}
