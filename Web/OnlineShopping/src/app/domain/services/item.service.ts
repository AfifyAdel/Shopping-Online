import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis } from '../constants/apis';
import { ApimanagerService } from './apimanager.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private apimanager: ApimanagerService) { }

  getItems(): Observable<any> {
    return this.apimanager.get(Apis.getItems).map((res) => {
      return res;
    });
  }
  getItemById(id): Observable<any> {
    return this.apimanager.get(Apis.getItemById + id).map((res) => {
      return res;
    });
  }

  addItem(data: FormData): Observable<any> {
    return this.apimanager.postFiles(Apis.addItem, data).map((res) => {
      return res;
    });
  }
  updateItem(data: FormData): Observable<any> {
    return this.apimanager.postFiles(Apis.updateItem, data).map((res) => {
      return res;
    });
  }

  deleteItem(id: number): Observable<any> {
    return this.apimanager.post(Apis.deleteItem, id).pipe().map((res) => {
      return res;
    });
  }
}
