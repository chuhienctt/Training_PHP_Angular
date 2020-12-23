import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const url = environment.apiBase + "dia-chinh/";
const baseUrl = environment.apiUrl + "dia-chinh/"

@Injectable({
  providedIn: 'root'
})

export class AddressService {

  constructor(private _http:HttpClient) { }

  getProvince() {
    return this._http.get(url + "get-tinh");
  }

  getDistrict(id) {
    return this._http.get(url + "get-huyen?id=" + id);
  }

  getCommune(id) {
    return this._http.get(url + "get-xa?id=" + id);
  }

  getAddress(id) {
    return this._http.get(url + "get-dia-chi?id=" + id);
  }

  paginationCity(first, rows) {
    return this._http.get(baseUrl + "pagination-tinh?first=" + first + "&row=" + rows);
  }

  createCity(city) {
    return this._http.post(baseUrl + "create-tinh", city);
  }

  getCity(id) {
    return this._http.get(baseUrl + "get-tinh?id=" + id);
  }

  updateCity(id, city) {
    return this._http.put(baseUrl + "update-tinh?id=" + id, city);
  }

  deleteCity(id) {
    return this._http.delete(baseUrl + "delete-tinh?id=" + id);
  }

  paginationDistrict(id_province, first, rows) {
    return this._http.get(baseUrl + "pagination-huyen?id_province=" + id_province + "&first=" + first + "&row=" + rows);
  }
}
