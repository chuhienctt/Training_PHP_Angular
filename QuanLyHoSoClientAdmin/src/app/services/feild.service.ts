import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const baseUrl = environment.apiUrl + "linh-vuc/";

@Injectable({
  providedIn: 'root'
})
export class FeildService {

  constructor(private _http: HttpClient) { }

  getData(first, rows) {
    return this._http.get(baseUrl + "pagination?first=" + first + "&&rows=" + rows);
  }

  create(feild) {
    return this._http.post(baseUrl + "create", feild);
  }

  edit(id) {
    return this._http.get(baseUrl + "get?id=" + id);
  }

  delete(id) {
    return this._http.delete(baseUrl + "delete?id=" + id);
  }
}
