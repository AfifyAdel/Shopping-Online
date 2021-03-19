import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ApimanagerService } from './apimanager.service';
import { BehaviorSubject } from 'rxjs';
import { Apis } from '../constants/apis';
import { CryptService } from '../security/crypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable();
  private _manager: ApimanagerService;

  constructor(apimanager: ApimanagerService, private cryptService: CryptService) {

    var cryptUser = this.cryptService.Encrypt('_current_user');
    if (localStorage.getItem(cryptUser))
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.cryptService.Decrypt(localStorage.getItem(cryptUser) || '') || '{}'));
    else
      this.currentUserSubject = new BehaviorSubject<User>(null as any);
    this._manager = apimanager;
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(data: any) {

    return this._manager.post(Apis.login, data).map(((data) => {
      if (data.status > 0) {
        data.resource.session = new Date();
        localStorage.setItem(this.cryptService.Encrypt('_current_user'), this.cryptService.Encrypt(JSON.stringify(data.resource)));
        this.currentUserSubject.next(data.resource);
      }
      return data;
    }));
  }
  public logout() {
    localStorage.clear();
    this.currentUserSubject.next(null as any);
  }
}
