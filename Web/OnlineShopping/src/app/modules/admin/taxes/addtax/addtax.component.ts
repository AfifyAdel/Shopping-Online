import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { Tax } from 'src/app/domain/models/tax';
import { TaxService } from 'src/app/domain/services/tax.service';

@Component({
  selector: 'app-addtax',
  templateUrl: './addtax.component.html',
  styleUrls: ['./addtax.component.scss']
})
export class AddtaxComponent implements OnInit {

  addForm: FormGroup;
  validationMsgAdd: string;
  validationErrorAdd: boolean;
  submittedAdd: boolean = false;

  constructor(private taxService: TaxService,
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

    this.submittedAdd = true;
    if (this.addForm.invalid) {
      return;
    }
    var controls = this.addForm.value;
    var model = new Tax();
    model.code = controls.code;
    model.value = Number(controls.value);
    this.taxService.addTax(model).subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.router.navigate(['/admin/taxes']);
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else {
        alert("Server Error");
      }
    });
  }
}
