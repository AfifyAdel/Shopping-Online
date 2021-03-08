import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis } from '../constants/apis';
import { Discount } from '../models/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private _http: HttpClient) { }
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  getDiscounts(): Observable<any> {
    return this._http.get<any>(Apis.getDiscounts).pipe();
  }
  getDiscountByCode(code: string): Observable<any> {
    return this._http.get<any>(Apis.getDiscountByCode + code).pipe();
  }

  addDiscount(discount: Discount): Observable<any> {
    return this._http.post<any>(Apis.addDiscount, discount, { headers: this.headers }).pipe();
  }
  deleteDiscount(id: number): Observable<any> {
    return this._http.post<any>(Apis.deleteDiscount, id, { headers: this.headers }).pipe();
  }

}
