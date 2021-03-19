import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Util } from 'src/app/domain/communication/util';
import { User } from 'src/app/domain/models/user';
import { CryptService } from 'src/app/domain/security/crypt.service';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { OrderdetailsService } from 'src/app/domain/services/orderdetails.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  counter: number = 0;
  currentUser: User;
  constructor(private router: Router, private currentItemsService: OrderdetailsService
    , private cryptoService: CryptService, private authService: AuthenticationService) { }

  ngOnInit(): void {

    var cryptUser = this.cryptoService.Encrypt('_current_user');
    this.currentUser = JSON.parse(this.cryptoService.Decrypt(localStorage.getItem(cryptUser) || '') || '{}');
    this.currentItemsService.count.subscribe(c => {
      this.counter = c;
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  navigateToDetails() {
    this.router.navigate(["/orderdetails"]);
  }
  logoClick() {
    let util = new Util(this.router);
    util.Route(this.currentUser.roleId);
  }
  navigateToProfile() {

  }
  navigateToOrders() {

  }
}
