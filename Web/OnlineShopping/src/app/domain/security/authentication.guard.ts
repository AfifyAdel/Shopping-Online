import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Eusertypes } from '../constants/enums/eusertypes.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  private _router: Router;
  constructor(router: Router) {
    this._router = router;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser = JSON.parse(localStorage.getItem('_cuser') || '{}');

    if (Object.keys(currentUser).length !== 0) {
      if (next.url.length == 0) {
        if (currentUser.role !== Eusertypes.Admin)
          return true;
        else
          return this._router.navigate(['/login']);;
      }
      else
        if (next.url[0].path == "admin" && currentUser.role == Eusertypes.Admin)
          return true;
        else if (next.url.length == 0 && currentUser.role !== Eusertypes.Admin)
          return true;
        else
          this._router.navigate(['/login']);;

    }
    return this._router.navigate(['/login']);
  }

}
