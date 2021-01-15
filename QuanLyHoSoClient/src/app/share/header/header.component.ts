import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {HomeService} from "../../services/home.service";

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  listFeild = [];

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.output().subscribe(data => {
      if (data) {
        this.homeService.currentUser = data;
      }
    })

    this.getFeild();
  }

  get user() {
    return this.homeService.currentUser;
  }

  logOut() {
    localStorage.removeItem("jwt");
    this.homeService.currentUser = null;
    this.router.navigate(["/login"]);
  }

  getFeild() {
    this.homeService.getFeild().subscribe((res:any) => {
      this.listFeild = res;
    })
  }

}
