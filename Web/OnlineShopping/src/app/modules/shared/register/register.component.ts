import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { User } from 'src/app/domain/models/user';
import { AccountService } from 'src/app/domain/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  constructor(private formbulider: FormBuilder, private accountService: AccountService, private router: Router, private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.registerForm = this.formbulider.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      birthdate: [new Date, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {

    this.submitted = true;
    if (this.registerForm.invalid)
      return;
    this.SpinnerService.show();
    var user = new User();
    user.firstName = this.registerForm.controls.firstname.value;
    user.lastName = this.registerForm.controls.lastname.value;
    user.userName = this.registerForm.controls.username.value;
    user.email = this.registerForm.controls.email.value;
    user.birthdate = this.registerForm.controls.birthdate.value;
    user.password = this.registerForm.controls.password.value;

    this.accountService.Register(user).subscribe(((response) => {
      if (response.status > 0) {
        this.SpinnerService.hide();
        this.router.navigate(["/login"]);
      }
      else if (response.status === Responsestatus.error) {
        this.SpinnerService.hide();
        alert(response.message);
      }
      else {
        this.SpinnerService.hide();
      }
    }));
  }
}
