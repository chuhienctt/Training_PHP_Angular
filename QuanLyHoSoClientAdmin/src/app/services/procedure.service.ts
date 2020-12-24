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

  }

  edit(id) {

  }

  update(id, procedure) {

  }

  delete(id) {

  }

  unDelete(id) {

  }
}
