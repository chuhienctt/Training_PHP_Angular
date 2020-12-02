import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getAddress() {
    return this._http.get('/assets/libs/all.json');
  }
}
