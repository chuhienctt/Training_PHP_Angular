import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }

  canActivate() {
    let token = localStorage.getItem("jwt");
    if (token) {
      location.replace("/");
      return false;
    }
    return true;
  }

}
