import { Injectable } from '@angular/core';
import {CanActivate, RouterStateSnapshot, Router, ActivatedRouteSnapshot} from '@angular/router';
import {JwtHelperService} from "@auth0/angular-jwt";
import { HomeService } from '../services/home.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private homeService: HomeService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      let user = JSON.parse(jwt);
      this.homeService.check().subscribe(res => {});
      return true;
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
