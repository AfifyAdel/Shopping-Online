import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apis } from '../constants/apis';
import { LoginModel } from '../models/accountModels/loginModel';
import { RegisterModel } from '../models/accountModels/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _http: HttpClient) { }

  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  Login(model: LoginModel): Observable<any> {

    return this._http.post<any>(Apis.login, model, { headers: this.headers }).pipe();
  }

  Register(model: RegisterModel): Observable<any> {
    return this._http.post<any>(Apis.register, model, { headers: this.headers }).pipe();
  }
}
