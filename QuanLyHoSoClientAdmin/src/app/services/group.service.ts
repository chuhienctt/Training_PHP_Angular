import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

const baseUrl = environment.apiUrl + "nhom/";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private _http: HttpClient) { }

  pagination(first, rows) {
    return this._http.get(baseUrl + "pagination?first="+ first + "&row=" +rows);
  }

  create(group) {
    return this._http.post(baseUrl + "create", group);
  }

  get(id) {
    return this._http.get(baseUrl + "get?id=" +id);
  }

  getGroup(id_co_quan) {
    return this._http.get(baseUrl + "get?id_co_quan=" + id_co_quan);
  }

  update(group) {
    return this._http.put(baseUrl + "update", group);
  }

  delete(id) {
    return this._http.delete(baseUrl + "delete?id=" + id);
  }

  unDelete(id) {
    return this._http.delete(baseUrl + "undelete?id=" + id);
  }
}
