import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

const baseUrl = environment.apiUrl + "user/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  loadData(first, rows) {
    return this._http.get(baseUrl + "pagination?first=" + first + "row=" + rows);
  }

  create(user) {
    return this._http.post(baseUrl + "create", user);
  }
}
