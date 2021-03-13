import { Injectable } from '@angular/core';
import { Apis } from '../constants/apis';
import { Order } from '../models/order';
import { ApimanagerService } from './apimanager.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private apimanager: ApimanagerService) { }

  getOrders() {
    return this.apimanager.get(Apis.getOrders).map((res) => {
      return res;
    });
  }
  getOrderItems(orderId: number) {
    return this.apimanager.get(Apis.getOrderItems + orderId).map((res) => {
      return res;
    });
  }
  getCustomerOrders(customerId: number) {
    return this.apimanager.get(Apis.getCustomerOrders + customerId).map((res) => {
      return res;
    });
  }

  addOrder(order: Order) {
    return this.apimanager.post(Apis.addOrder, order).map((res) => {
      return res;
    });
  }
  updateOrder(order: Order) {

    return this.apimanager.post(Apis.updateOrder, order).map((res) => {
      return res;
    });
  }
}

