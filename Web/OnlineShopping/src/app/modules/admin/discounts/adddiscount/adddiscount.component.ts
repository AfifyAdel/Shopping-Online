import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { Discount } from 'src/app/domain/models/discount';
import { DiscountService } from 'src/app/domain/services/discount.service';

@Component({
  selector: 'app-adddiscount',
  templateUrl: './adddiscount.component.html',
  styleUrls: ['./adddiscount.component.scss']
})
export class AdddiscountComponent implements OnInit {

  addForm: FormGroup;
  validationMsgAdd: string;
  validationErrorAdd: boolean;
  submittedAdd: boolean = false;

  constructor(private discountService: DiscountService,
    private _formBuilder: FormBuilder, private router: Router) {
    this.createAddForm();
  }

  ngOnInit() {
  }
  createAddForm() {
    this.addForm = this._formBuilder.group(
      {
        code: new FormControl("", Validators.required),
        value: new FormControl("", Validators.required)
      }
    );
  }
  get form() {
    return this.addForm.controls;
  }
  submit() {
    debugger;
    this.submittedAdd = true;
    if (this.addForm.invalid) {
      return;
    }
    var controls = this.addForm.value;
    var model = new Discount();
    model.code = controls.code;
    model.value = Number(controls.value);
    this.discountService.addDiscount(model).subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.router.navigate(['/admin/discounts']);
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else {
        alert("Server Error");
      }
    });
  }
}