import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Util } from '../communication/util';
import { CryptService } from './crypt.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  private _router: Router;

  constructor(router: Router, private cryptoService: CryptService) {
    this._router = router;

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var cryptUser = this.cryptoService.Encrypt('_current_user');
    var cryptValue = this.cryptoService.Decrypt(localStorage.getItem(cryptUser) || '');
    const currentUser = JSON.parse(cryptValue || '{}');
    if (Object.keys(currentUser).length !== 0) {
      let util = new Util(this._router);
      util.Route(currentUser.roleId);
      return false;
    }

    return true;
  }

}
