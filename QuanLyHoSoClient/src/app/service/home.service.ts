import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";

const baseUrl = environment.apiUrl + "auth/";

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

  getProvince() {
    return this._http.get(environment.apiUrl + "dia-chinh/get-tinh");
  }

  getDistrict(id) {
    return this._http.get(environment.apiUrl + "dia-chinh/get-huyen?id=" + id);
  }

  getCommune(id) {
    return this._http.get(environment.apiUrl + "dia-chinh/get-xa?id=" + id);
  }

  register(user) {
    return this._http.post(baseUrl + "register", user);
  }

  login(user) {
    return this._http.post(baseUrl + "login", user);
  }

  changePass(user) {
    return this._http.post(baseUrl + "change-pass", user);
  }
}
