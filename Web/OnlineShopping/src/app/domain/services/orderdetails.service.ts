import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderDetail } from '../models/orderDetail';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

  counter = 0;
  count: BehaviorSubject<number>;
  orderitems: BehaviorSubject<Array<OrderDetail>>;
  items: Array<OrderDetail> = [];
  constructor() {
    this.count = new BehaviorSubject(this.counter);
    this.orderitems = new BehaviorSubject<OrderDetail[]>(this.items);
  }

  nextCount() {
    this.count.next(++this.counter);
  }
  prevCount() {
    this.count.next(--this.counter);
  }
  addItem(item: OrderDetail) {
    this.items.push(item);
    this.orderitems.next(this.items);
  }
  getItems() {
    return this.items;
  }
  deleteItem(item) {
    if (item) {
      this.items = this.items.filter(obj => obj !== item);
      this.orderitems.next(this.items);
    }
  }
  orderDone() {
    this.items = [];
    this.counter = 0;
    this.orderitems.next(this.items);
    this.count.next(this.counter);
  }
}
