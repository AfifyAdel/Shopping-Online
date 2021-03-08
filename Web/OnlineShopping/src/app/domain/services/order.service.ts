import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis } from '../constants/apis';
import { Order } from '../models/order';
import { OrderStatusModel } from '../models/orderStatusModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  getOrders(): Observable<any> {
    return this._http.get<any>(Apis.getOrders).pipe();
  }
  getOrderItems(orderId: number): Observable<any> {
    return this._http.get<any>(Apis.getOrderItems + orderId).pipe();
  }
  getCustomerOrders(customerId: number): Observable<any> {
    return this._http.get<any>(Apis.getCustomerOrders + customerId).pipe();
  }

  changeStatus(model: OrderStatusModel): Observable<any> {
    return this._http.post<any>(Apis.changeStatus, model, { headers: this.headers }).pipe();
  }
  addOrder(order: Order): Observable<any> {
    return this._http.post<any>(Apis.addOrder, order, { headers: this.headers }).pipe();
  }
}

