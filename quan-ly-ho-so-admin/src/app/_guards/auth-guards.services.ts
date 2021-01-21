import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const baseUrl = environment.apiUrl + "auth/";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private _http: HttpClient) {}

  canActivate() {
    const token = localStorage.getItem('jwt');
    if (token) {
      return true;
    }
    this.router.navigate(['/login1']);
    return false;
  }
}
