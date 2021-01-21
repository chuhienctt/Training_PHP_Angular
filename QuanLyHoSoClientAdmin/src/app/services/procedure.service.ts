import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

const baseUrl = environment.apiUrl + "thu-tuc/";

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  constructor(private _http: HttpClient) { }

  pagination(first, rows) {
    return this._http.get(baseUrl + "pagination?first=" + first + "&row=" + rows)
  }

  create(procedure) {
    return this._http.post(baseUrl + "create", procedure);
  }

  edit(id) {
    return this._http.get(baseUrl + "get?id=" + id);
  }

  update(id, procedure) {
    return this._http.put(baseUrl + "update?id=" + id, procedure);
  }

  delete(id) {
    return this._http.delete(baseUrl + "delete?id=" + id);
  }

  unDelete(id) {
    return this._http.delete(baseUrl + "undelete?id=" + id);
  }

  getTemplate() {
    return this._http.get(baseUrl + "templates");
  }
}
