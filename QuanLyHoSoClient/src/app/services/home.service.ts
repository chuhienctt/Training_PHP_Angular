import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";

const apiAuth = environment.apiUrl + "auth/";
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  private authSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("jwt")));
  private current = this.authSubject.asObservable();
  currentUser = null;

  constructor(private _http: HttpClient) { }

  input(data) {
    this.authSubject.next(data);
  }

  output() {
    return this.current;
  }

  register(user) {
    return this._http.post(apiAuth + "register", user);
  }

  login(user) {
    return this._http.post(apiAuth + "login", user);
  }

  changePass(user) {
    return this._http.post(apiAuth + "change-pass", user);
  }

  update(profile) {
    return this._http.put(apiAuth + "update", profile);
  }

  check() {
    return this._http.get(apiAuth + "check");
  }

  getFeild() {
    return this._http.get(baseUrl + "linh-vuc/get");
  }
}
