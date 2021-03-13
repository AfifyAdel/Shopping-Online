import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis } from '../constants/apis';
import { Tax } from '../models/tax';
import { ApimanagerService } from './apimanager.service';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private apimanager: ApimanagerService) { }

  getTaxes() {
    return this.apimanager.get(Apis.getTaxes).map((res) => {
      return res;
    });
  }
  getTaxByCode(code: string) {
    return this.apimanager.get(Apis.getTaxByCode + code).map((res) => {
      return res;
    });
  }

  addTax(tax: Tax) {
    return this.apimanager.post(Apis.addTax, tax).map((res) => {
      return res;
    });
  }
  deleteTax(id: number) {
    return this.apimanager.post(Apis.deleteTax, id).map((res) => {
      return res;
    });
  }
}
