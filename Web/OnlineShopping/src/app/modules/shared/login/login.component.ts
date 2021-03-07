import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from 'src/app/domain/communication/util';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { LoginModel } from 'src/app/domain/models/accountModels/loginModel';
import { AccountService } from 'src/app/domain/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
    //private authenticationService: AuthenticationService,
    //private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid)
      return;
    var user = new LoginModel();
    user.password = this.loginForm.controls.password.value;
    user.userName = this.loginForm.controls.username.value;

    this.accountService.Login(user).subscribe(((response) => {
      debugger;
      if (response.status > 0) {
        localStorage.setItem('_cuser', JSON.stringify(response.resource));
        let util = new Util(this.router);
        util.Route(response.resource.role);
      }
      else if (response.status === Responsestatus.error) {
        alert(response.message);
      }

    }));
  }
}
