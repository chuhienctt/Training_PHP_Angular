import { Injectable } from '@angular/core';
import {ActivatedRoute, CanActivate, Route} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsloginGuard implements CanActivate {
  constructor(private route: ActivatedRoute) {
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
