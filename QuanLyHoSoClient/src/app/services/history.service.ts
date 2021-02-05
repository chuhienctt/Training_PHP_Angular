import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private _http:HttpClient) { }

  getProcedure(page, pageSize, trang_thai) {
    return this._http.get(environment.apiUrl + "ho-so/get-ho-so?page=" + page + "&pageSize=" + pageSize + "&trang_thai=" + trang_thai);
  }

  getDetail(id) {
    return this._http.get(environment.apiUrl + "ho-so/get?id=" + id);
  }

  updateProfile(id, profile) {
    return this._http.put(environment.apiUrl + "ho-so/update?id=" + id, profile);
  }

  search(code) {
    return this._http.post(environment.apiUrl + "ho-so/tra-cuu", {code: code})
  }
}
