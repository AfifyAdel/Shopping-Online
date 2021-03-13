import { Order } from "./order";

export class User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  birthdate: Date;
  address: string;
  phoneNumber: string;
  roleId: number;
  orders: Order[];
  token: string;
}
