import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Util } from 'src/app/domain/communication/util';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { LoginModel } from 'src/app/domain/models/accountModels/loginModel';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';

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
    private router: Router,
    private authService: AuthenticationService,
    private SpinnerService: NgxSpinnerService
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
    this.SpinnerService.show();
    var user = new LoginModel();
    user.password = this.loginForm.controls.password.value;
    user.userName = this.loginForm.controls.username.value;

    this.authService.login(user).subscribe(((response) => {
      if (response.status > 0) {

        this.SpinnerService.hide();
        this.submitted = false;
        let util = new Util(this.router);
        util.Route(response.resource.roleId);
      }
      else if (response.status === Responsestatus.error) {
        alert(response.message);
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
      }
    }));
  }
}
