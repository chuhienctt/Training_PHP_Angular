import { Injectable } from '@angular/core';
import {CanActivate, RouterStateSnapshot, Router, ActivatedRouteSnapshot} from '@angular/router';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = localStorage.getItem("jwt");
    if (token){
      return true;
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
