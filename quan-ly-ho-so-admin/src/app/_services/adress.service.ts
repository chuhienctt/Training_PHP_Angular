import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const baseUrl = "http://localhost:8200/api/dia-chinh/";

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

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdressService {

//   constructor() { }
// }
