import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs-compat";
import { Apis } from "../constants/apis";
import { CryptService } from "../security/crypt.service";
import { AuthenticationService } from "../services/authentication.service";
import { ConfigService } from "./config.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(public authenticationService: AuthenticationService, private router: Router,
    private config: ConfigService, private cryptoService: CryptService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
    // add auth header with jwt if user is logged in and request is to api url

    const DateNow: any = new Date();
    let currentUser = this.authenticationService.currentUserValue;
    var cryptUser = this.cryptoService.Encrypt('_current_user');
    if (currentUser && !localStorage.getItem(cryptUser)) {
      this.authenticationService.logout();
      this.router.navigate(["/login"]);
      return;
    }

    if ((currentUser == undefined || currentUser == null)) {
      return next.handle(request);
    } else {
      // add auth header with jwt if user is logged in and request is to api url
      const currentUser = this.authenticationService.currentUserValue;
      const isLoggedIn = currentUser && currentUser.token;
      const isApiUrl = request.url.startsWith(new Apis(this.config).domainName);
      if (isLoggedIn && isApiUrl) {
        if (isLoggedIn && isApiUrl) {
          if (isLoggedIn && isApiUrl) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${currentUser.token}`
              }
            });
          }
          return next.handle(request);
        } else {
          this.authenticationService.logout();
          this.router.navigate(["/login"]);
        }
      } else if (!isLoggedIn) {
        return next.handle(request);
      }
      else {
        this.authenticationService.logout();
        this.router.navigate(["/login"]);
      }
    }
  }
}
