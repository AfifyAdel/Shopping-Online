import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis } from '../constants/apis';
import { Tax } from '../models/tax';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private _http: HttpClient) { }
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  getTaxes(): Observable<any> {
    return this._http.get<any>(Apis.getTaxes).pipe();
  }
  getTaxByCode(code: string): Observable<any> {
    return this._http.get<any>(Apis.getTaxByCode + code).pipe();
  }

  addTax(tax: Tax): Observable<any> {
    return this._http.post<any>(Apis.addTax, tax, { headers: this.headers }).pipe();
  }
  deleteTax(id: number): Observable<any> {
    return this._http.post<any>(Apis.deleteTax, id, { headers: this.headers }).pipe();
  }
}
