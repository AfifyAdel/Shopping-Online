import { Discount } from "./discount";
import { OrderDetail } from "./orderDetail";
import { Tax } from "./tax";

export class Order {
  id: number;
  orderDate: Date;
  requestDate: Date;
  dueDate: Date;
  status: number;
  customerId: string;
  customer: any;
  taxId: number;
  discountId: number;
  tax: Tax;
  discount: Discount;
  totalPrice: number;
  orderDetails: Array<OrderDetail>
}
