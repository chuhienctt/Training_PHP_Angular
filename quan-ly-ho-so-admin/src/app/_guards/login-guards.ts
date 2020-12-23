import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }

  canActivate() {
    const token = localStorage.getItem("jwt");
    if (!token){
      return true;
    }
    this.router.navigate(["/dashboard"]);
    return false;
  }
  logOut() {
    localStorage.removeItem("jwt");
 }
}
