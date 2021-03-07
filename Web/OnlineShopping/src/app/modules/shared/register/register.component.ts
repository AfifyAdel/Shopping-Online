import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { RegisterModel } from 'src/app/domain/models/accountModels/registerModel';
import { AccountService } from 'src/app/domain/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  constructor(private formbulider: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formbulider.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid)
      return;
    var user = new RegisterModel();
    user.firstName = this.registerForm.controls.firstname.value;
    user.lastName = this.registerForm.controls.lastname.value;
    user.userName = this.registerForm.controls.username.value;
    user.email = this.registerForm.controls.email.value;
    user.password = this.registerForm.controls.password.value;

    this.accountService.Register(user).subscribe(((response) => {
      debugger;
      if (response.status > 0) {
        this.router.navigate(["/login"]);
      }
      else if (response.status === Responsestatus.error) {
        alert(response.message);
      }

    }));
  }
}
