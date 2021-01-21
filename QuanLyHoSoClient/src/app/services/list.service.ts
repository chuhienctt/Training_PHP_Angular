import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private _http:HttpClient
  ) { }

  getProcedure(page, pageSize, id, id_co_quan, muc_do, keyword) {
    return this._http.get(baseUrl + "thu-tuc/pagination?page=" + page + "&pageSize=" + pageSize + "&id_linh_vuc=" + id + "&id_co_quan=" + id_co_quan + "&muc_do=" + muc_do + "&keyword=" + keyword);
  }

  getAllFeild() {
    return this._http.get(baseUrl + "linh-vuc/get");
  }

  getAllOrgan() {
    return this._http.get(baseUrl + "co-quan/get");
  }

  getFeild(id_co_quan) {
    return this._http.get(baseUrl + "co-quan/get?id=" + id_co_quan);
  }
}
