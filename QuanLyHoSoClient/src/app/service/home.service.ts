import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

const baseUrl = environment.apiUrl + "auth/";

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  constructor(private _http: HttpClient) { }

  getAddress() {
    return this._http.get('/assets/libs/all.json');
  }

  register(user) {
    return this._http.post(baseUrl + "register", user);
  }

  login(user) {
    return this._http.post(baseUrl + "login", user);
  }
}
