import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";

const baseUrl = environment.apiUrl + "user/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  loadData(first, rows) {
    return this._http.get(baseUrl + "pagination?first=" + first + "&row=" + rows);
  }

  create(user) {
    return this._http.post(baseUrl + "create", user);
  }

  get(id) {
    return this._http.get(baseUrl + "get?id=" + id);
  }

  update(id, user) {
    return this._http.put(baseUrl + "update?id="+id, user);
  }

  block(id) {
    let param = new HttpParams()
      .set('id', id);
    return this._http.post(baseUrl + "block", {}, {params:param});
  }

  unblock(id) {
    let param = new HttpParams()
      .set('id', id);
    return this._http.post(baseUrl + "unblock", {}, {params: param});
  }

  getUser(id_co_quan) {
    return this._http.get(baseUrl + "get?id_co_quan=" + id_co_quan);
  }
}
