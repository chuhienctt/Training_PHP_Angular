import { Component, Injector, OnInit } from '@angular/core';
import { ScriptService } from "../libs/script.service";

declare var $:any;

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
    $(".dial1").knob();
    $({ animatedVal: 0 }).animate({ animatedVal: 66 }, {
      duration: 4000,
      easing: "swing",
      step: function() {
        $(".dial1").val(Math.ceil(this.animatedVal)).trigger("change");
      }
    });
    $(".dial2").knob();
    $({ animatedVal: 0 }).animate({ animatedVal: 26 }, {
      duration: 4500,
      easing: "swing",
      step: function() {
        $(".dial2").val(Math.ceil(this.animatedVal)).trigger("change");
      }
    });
    $(".dial3").knob();
    $({ animatedVal: 0 }).animate({ animatedVal: 76 }, {
      duration: 3800,
      easing: "swing",
      step: function() {
        $(".dial3").val(Math.ceil(this.animatedVal)).trigger("change");
      }
    });
    $(".dial4").knob();
    $({ animatedVal: 0 }).animate({ animatedVal: 88 }, {
      duration: 5200,
      easing: "swing",
      step: function() {
        $(".dial4").val(Math.ceil(this.animatedVal)).trigger("change");
      }
    });
    let elem = document.getElementsByClassName('dashboard');
    if (elem.length != undefined) {
      for (var i = elem.length - 1; 0 <= i; i--) {
        elem[i].remove();
      }
    }
    this.loadScripts();
  }

}
