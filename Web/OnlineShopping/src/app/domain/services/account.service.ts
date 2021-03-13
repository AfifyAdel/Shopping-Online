import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis } from '../constants/apis';
import { ApimanagerService } from './apimanager.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private apimanager: ApimanagerService) { }

  Register(data): Observable<any> {
    return this.apimanager.post(Apis.register, data).map((res) => {
      return res;
    });
  }
}
