import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

const baseUrl = environment.apiUrl + "auth/"

@Injectable({
  providedIn: 'root'
})
export class AdminService {
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

  login(user) {
    return this._http.post(baseUrl + "login", user);
  }

  changePass(user) {
    return this._http.post(baseUrl + "change-pass", user);
  }

  update(profile) {
    return this._http.put(baseUrl + "update", profile);
  }
}
