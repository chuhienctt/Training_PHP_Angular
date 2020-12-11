import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const baseUrl = environment.apiUrl + "admin/linh-vuc/";

@Injectable({
  providedIn: 'root'
})
export class FeildService {

  constructor(private _http: HttpClient) { }

  getData(first, rows) {
    return this._http.get(baseUrl + "pagination?" + "first=" + first + "&&" + "rows=" + rows);
  }
}
