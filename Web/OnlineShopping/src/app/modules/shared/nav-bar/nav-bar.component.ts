import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthModel } from 'src/app/domain/models/accountModels/authModel';
import { OrderdetailsService } from 'src/app/domain/services/orderdetails.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  counter: number = 0;
  model: AuthModel;
  constructor(private router: Router, private currentItemsService: OrderdetailsService) { }

  ngOnInit(): void {

    this.model = JSON.parse(localStorage.getItem('_cuser') || '{}');
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
