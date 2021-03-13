import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis } from '../constants/apis';
import { Discount } from '../models/discount';
import { ApimanagerService } from './apimanager.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private apimanager: ApimanagerService) { }

  getDiscounts() {
    return this.apimanager.get(Apis.getDiscounts).map((res) => {
      return res;
    });
  }
  getDiscountByCode(code: string) {
    return this.apimanager.get(Apis.getDiscountByCode + code).map((res) => {
      return res;
    });
  }

  addDiscount(discount: Discount) {
    return this.apimanager.post(Apis.addDiscount, discount).map((res) => {
      return res;
    });
  }
  deleteDiscount(id: number) {
    return this.apimanager.post(Apis.deleteDiscount, id).map((res) => {
      return res;
    });
  }

}
