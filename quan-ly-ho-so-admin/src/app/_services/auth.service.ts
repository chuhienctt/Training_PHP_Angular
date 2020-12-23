import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";

const baseUrl = environment.apiUrl + "auth/";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("jwt")));
  private current = this.authSubject.asObservable();

  constructor(private _http: HttpClient) {
  }

  get currentUser() {
    return this.authSubject.value;
  }

  input(data) {
    this.authSubject.next(data);
  }

  output() {
    return this.current;
  }

  login(user) {
    return this._http.post(baseUrl + "login", user);
  }

  changepass(user) {
    return this._http.post(baseUrl + "change-pass", user);
  }

  logout(user) {
    localStorage.removeItem(user);
  }
  
}
