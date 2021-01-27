import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const baseUrl = environment.apiUrl + "thu-tuc/";

@Injectable({
  providedIn: 'root'
})
export class SendProfileService {

  constructor(private _http:HttpClient) { }

  getProcedure(id) {
    return this._http.get(baseUrl + "get-quy-trinh?id=" + id);
  }

  getTemplate(id_quy_trinh) {
    return this._http.get(environment.apiUrl + "ho-so/get-template?id_quy_trinh=" + id_quy_trinh);
  }

  sendProfile(profile) {
    return this._http.post(environment.apiUrl + "ho-so/create", profile);
  }
}
