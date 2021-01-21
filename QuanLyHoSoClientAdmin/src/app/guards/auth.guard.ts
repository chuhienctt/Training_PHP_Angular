import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private userService: UserService
  ) {
  }

  canActivate() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      let user = JSON.parse(jwt);
      this.userService.get(user.id).subscribe(res => {});
      return true;
    }
    this.router.navigate(["/auth/login"]);
    return false;
  }

}
