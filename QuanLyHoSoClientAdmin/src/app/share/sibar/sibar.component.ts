import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sibar',
  templateUrl: './sibar.component.html',
  styleUrls: ['./sibar.component.css']
})
export class SibarComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.adminService.output().subscribe(data => {
      if (data) {
        this.adminService.currentUser = data;
      }
    })
  }

  get User() {
    return this.adminService.currentUser;
  }

  createImg(path) {
    return environment.urlImg + path;
  }

  logOut = () => {
    if(confirm("Bạn muốn đăng xuất?")) {
      localStorage.removeItem("jwt");
      this.router.navigate(['/auth/login']);
    }
  }

}
