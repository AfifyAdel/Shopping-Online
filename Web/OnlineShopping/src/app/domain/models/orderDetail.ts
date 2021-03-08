import { Order } from "./order";

export class OrderDetail {
  id: number;
  orderId: number;
  order: Order;
  itemId: number;
  itemPrice: number;
  quantity: number;
  totalPrice: number;
  uOM: number;
  tax: number;
  discount: number;
}
