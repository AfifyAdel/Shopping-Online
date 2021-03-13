import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { User } from 'src/app/domain/models/user';
import { CryptService } from 'src/app/domain/security/crypt.service';
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
    , private cryptoService: CryptService) { }

  ngOnInit(): void {

    var cryptUser = this.cryptoService.Encrypt('_current_user');
    this.currentUser = JSON.parse(this.cryptoService.Encrypt(localStorage.getItem(cryptUser) || '') || '{}');
    this.currentItemsService.count.subscribe(c => {
      this.counter = c;
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
  navigateToDetails() {
    this.router.navigate(["/orderdetails"]);
  }
}
