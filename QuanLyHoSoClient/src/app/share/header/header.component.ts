import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {HomeService} from "../../service/home.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = false;

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
  }

  get user() {
    return this.homeService.currentUser;
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem("jwt");
    this.homeService.currentUser = null;
    this.router.navigate(["/login"]);
  }

}
