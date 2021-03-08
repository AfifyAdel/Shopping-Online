import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis } from '../constants/apis';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private _http: HttpClient) { }
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  getItems(): Observable<any> {
    return this._http.get<any>(Apis.getItems).pipe();
  }


  addItem(data: FormData): Observable<any> {
    return this._http.post<any>(Apis.addItem, data, {
      headers: new HttpHeaders()
    });
  }
  updateItem(data: FormData): Observable<any> {
    return this._http.post<any>(Apis.updateItem, data, {
      headers: new HttpHeaders()
    });
  }

  deleteItem(id: number): Observable<any> {
    return this._http.post<any>(Apis.deleteItem, id, { headers: this.headers }).pipe();
  }
}
