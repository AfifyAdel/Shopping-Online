import { Discount } from "./discount";
import { Tax } from "./tax";
import { UnitOfMeasure } from "./unitOfMeasure";

export class Item {
  id: number;
  name: string;
  description: string;
  uom: number;
  unitOfMeasure: UnitOfMeasure;
  quantity: number;
  taxId: number;
  discountId: number;
  tax: Tax;
  discount: Discount;
  imagePath: string;
  attributes: string;
  price: number;
}
