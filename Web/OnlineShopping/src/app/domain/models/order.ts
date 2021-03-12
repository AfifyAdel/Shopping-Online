import { OrderDetail } from "./orderDetail";

export class Order {
  id: number;
  requestDate: Date;
  dueDate: Date;
  status: number;
  userId: number;
  taxId: number;
  discountId: number;
  totalPrice: number;
  orderDetails: Array<OrderDetail>
}
