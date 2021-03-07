import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthModel } from 'src/app/domain/models/accountModels/authModel';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  model: AuthModel;
  constructor(private router: Router) { }

  ngOnInit(): void {
    debugger;
    this.model = JSON.parse(localStorage.getItem('_cuser') || '{}');
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
