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

  getProcedure(item) {
    return this._http.post(baseUrl + "thu-tuc/pagination",item);
  }
}
