import { Order } from "./order";

export class User {
  id: number;
  irstName: string;
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
