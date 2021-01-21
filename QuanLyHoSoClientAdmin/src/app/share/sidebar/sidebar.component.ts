import {Component, Injector, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {ScriptService} from "../../libs/script.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends ScriptService implements OnInit {

  constructor(
    ịnjector: Injector,
    private adminService: AdminService,
    private router: Router
  ) {
    super(ịnjector)
  }

  ngOnInit(): void {
    let elem = document.getElementsByClassName('script');
    if (elem.length != undefined) {
      for (let i = elem.length - 1; 0 <= i; i--) {
        elem[i].remove();
      }
    }
    this.loadScripts();

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
