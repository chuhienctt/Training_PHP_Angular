import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

const baseUrl = environment.apiUrl + "admin/auth/login"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }

  login(user) {
    return this._http.post(baseUrl, user);
  }
}
