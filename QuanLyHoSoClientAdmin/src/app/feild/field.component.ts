import {Component, Injector, OnInit} from '@angular/core';
import {ScriptService} from '../libs/script.service';
import {MessageService, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-feild',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  providers: [MessageService]
})
export class FieldComponent extends ScriptService implements OnInit {

  constructor(
    private injector: Injector,
    private messageService: MessageService,
    private primeConfig: PrimeNGConfig
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadScripts();
    this.primeConfig.ripple = true;
  }

}
