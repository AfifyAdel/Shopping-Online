import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Util } from '../communication/util';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  private _router: Router;

  constructor(router: Router) {
    this._router = router;

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUser = JSON.parse(localStorage.getItem('_cuser') || '{}');
    if (Object.keys(currentUser).length !== 0) {
      let util = new Util(this._router);
      util.Route(currentUser.role);
      return false;
    }

    return true;
  }

}
