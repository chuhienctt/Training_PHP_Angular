import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

const baseUrl = environment.apiUrl + "dia-chinh/"

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _http:HttpClient) { }

  getProvince() {
    return this._http.get(baseUrl + "get-tinh");
  }

  getDistrict(id) {
    return this._http.get(baseUrl + "get-huyen?id=" + id);
  }

  getCommune(id) {
    return this._http.get(baseUrl + "get-xa?id=" + id);
  }

  getAddress(id) {
    return this._http.get(baseUrl + "get-dia-chi?id=" + id)
  }
}
