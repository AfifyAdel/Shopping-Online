import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Apis } from '../constants/apis';
import { ConfigService } from '../helpers/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApimanagerService {

  private _role = new BehaviorSubject("");

  currentRole = this._role.asObservable();

  checkUser(ckuser: string) {
    this._role.next(ckuser);
  }

  constructor(private _http: HttpClient, private config: ConfigService) { }

  get(url: string): Observable<any> {
    return this._http.get(new Apis(this.config).domainName + url).catch(this.handleError);
  }

  post(url: string, data: any): Observable<any> {

    let body = JSON.stringify(data);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this._http.post<any>(new Apis(this.config).domainName + url, body, { headers: headers }).catch(this.handleError);
  }

  postFiles(url: string, data: any): Observable<any> {
    const headers = new HttpHeaders();
    return this._http.post<any>(new Apis(this.config).domainName + url, data, {
      headers: headers
    }).catch(this.handleError);
  }

  handleError(handleError: any): any {
    console.log(handleError);
    console.log("Error in HTTP Module");
  }
}
