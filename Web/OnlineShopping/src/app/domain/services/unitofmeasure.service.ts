import { Injectable } from '@angular/core';
import { Apis } from '../constants/apis';
import { UnitOfMeasure } from '../models/unitOfMeasure';
import { ApimanagerService } from './apimanager.service';

@Injectable({
  providedIn: 'root'
})
export class UnitofmeasureService {

  constructor(private apimanager: ApimanagerService) { }

  getUOMs() {

    return this.apimanager.get(Apis.getUOMs).map((res) => {
      return res;
    });
  }
  getUOMByCode(code: string) {
    return this.apimanager.get(Apis.getUOMByCode + code).map((res) => {
      return res;
    });
  }

  addUOM(uom: UnitOfMeasure) {
    return this.apimanager.post(Apis.addUOM, uom).map((res) => {
      return res;
    });
  }
  deleteUOM(id: number) {
    return this.apimanager.post(Apis.deleteUOM, id).map((res) => {
      return res;
    });
  }
}
