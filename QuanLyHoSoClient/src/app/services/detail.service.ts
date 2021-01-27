import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const baseUrl = environment.apiUrl + "thu-tuc/";

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private _http:HttpClient) { }

  getDetail(id) {
    return this._http.get(baseUrl + "get?id=" + id);
  }
}
