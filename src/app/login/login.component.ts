import { Component, OnInit } from '@angular/core';
import {HomeService} from '../service/home.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  listCity = [];
  listDistrict = [];
  listCommune = [];
  city: string;
  district: string;
  commune: string;
  style = {};
  value: string;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getAddress().subscribe((data: any) => {
      this.listCity = data;
    });

    this.style = {
      'width': '100%',
      'border-radius': '25px',
      'padding-left': '22px',
      'height': '50px',
      'boder' : '1px solid rgba(51, 51, 51, 0.1);',
      'font-weight': 400,
      'font-family': 'Roboto'
    };
  }

  getDistrict(name) {
    this.city = name;
    this.listDistrict = [];
    this.listCommune = [];
    for (let i = 0; i < this.listCity.length; i++) {
      if (this.listCity[i].name === name) {
        this.listDistrict = this.listCity[i].huyen;
      }
    }
  }

  getCommune(name) {
    this.district = name;
    this.listCommune = [];
    for (let i = 0; i < this.listDistrict.length; i++) {
      if (this.listDistrict[i].name === name) {
        this.listCommune = this.listDistrict[i].xa;
      }
    }
  }

  getNameCommune(name) {
    this.commune = name;
  }

}
