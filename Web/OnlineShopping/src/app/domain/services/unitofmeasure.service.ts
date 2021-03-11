import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis } from '../constants/apis';
import { UnitOfMeasure } from '../models/unitOfMeasure';

@Injectable({
  providedIn: 'root'
})
export class UnitofmeasureService {

  constructor(private _http: HttpClient) { }
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  getUOMs(): Observable<any> {

    return this._http.get<any>(Apis.getUOMs).pipe();
  }
  getUOMByCode(code: string): Observable<any> {
    return this._http.get<any>(Apis.getUOMByCode + code).pipe();
  }

  addUOM(uom: UnitOfMeasure): Observable<any> {
    return this._http.post<any>(Apis.addUOM, uom, { headers: this.headers }).pipe();
  }
  deleteUOM(id: number): Observable<any> {
    return this._http.post<any>(Apis.deleteUOM, id, { headers: this.headers }).pipe();
  }
}
