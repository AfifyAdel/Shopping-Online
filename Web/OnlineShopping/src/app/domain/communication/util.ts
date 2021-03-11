import { Router } from '@angular/router';
import { Eusertypes } from '../constants/enums/eusertypes.enum';

export class Util {

  constructor(private _router: Router) { }
  Route(userType: number) {

    switch (userType) {
      case Eusertypes.Admin:
        this._router.navigate(["/admin/products"]);
        break;
      case Eusertypes.Customer:
        this._router.navigate(["/home"]);
        break;
      default:
        this._router.navigate(["/login"]);
        break;
    }
  }
}
