import { Injectable } from '@angular/core';
import { Apis } from '../constants/apis';
import { Category } from '../models/category';
import { ApimanagerService } from './apimanager.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private apimanager: ApimanagerService) { }

  getCategories() {
    return this.apimanager.get(Apis.getCategories).map((res) => {
      return res;
    });
  }
  getCategoryByName(name: string) {
    return this.apimanager.get(Apis.getCategoryByName + name).map((res) => {
      return res;
    });
  }

  addCategory(category: Category) {
    return this.apimanager.post(Apis.addCategory, category).map((res) => {
      return res;
    });
  }
  deleteCategory(id: number) {
    return this.apimanager.post(Apis.deleteCategory, id).map((res) => {
      return res;
    });
  }

}
