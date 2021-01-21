import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const HttpOptionss = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class QuanLyCoQuanService {
  public urlAPI = environment.apiUrl + 'co-quan/';
  constructor(private _http: HttpClient) {}

  getList(): Observable<any[]> {
    return this._http.get<any[]>(this.urlAPI +"get").pipe(map(res => {
      return res;
    }));
  }

  getData(first, rows): Observable<any[]> {
    return this._http.get<any[]>(this.urlAPI + "pagination?first=" + first + "&rows=" + rows).pipe(map(res => {
      return res;
    }));
  }

  GetSingle(id: any): Observable<any> {
    return this._http.get<any>(this.urlAPI + "get?id=" + id).pipe(map(res => {
      return res;
    }));
  }
  postItme(data: any): Observable<any> {
    //debugger;
    return this._http.post<any>(this.urlAPI + "create", data, HttpOptionss).pipe(map(res => {
      return res;
    }));
  }
  editItem(id: bigint, data: any): Observable<any> {
    //debugger;
    return this._http.put(this.urlAPI + "update?id=" + id, data,HttpOptionss).pipe(map(res => {
      return res;
    }));
  }
  deleteItem(id: bigint): Observable<any> {
    return this._http.delete<any>(this.urlAPI +"delete?id=" + id, HttpOptionss).pipe(map(res => {
      return res;
    }));
  } 
}

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class QuanLyCoQuanService {

//   constructor() { }
// }
