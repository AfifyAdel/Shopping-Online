import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './domain/models/user';
import { AuthenticationService } from './domain/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;
  constructor(private router: Router,
    private authenticationService: AuthenticationService) {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  title = 'OnlineShopping';
}
