import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { UnitOfMeasure } from 'src/app/domain/models/unitOfMeasure';
import { UnitofmeasureService } from 'src/app/domain/services/unitofmeasure.service';

@Component({
  selector: 'app-adduom',
  templateUrl: './adduom.component.html',
  styleUrls: ['./adduom.component.scss']
})
export class AdduomComponent implements OnInit {

  addForm: FormGroup;
  validationMsgAdd: string;
  validationErrorAdd: boolean;
  submittedAdd: boolean = false;
  showAlert: boolean = false;
  message: string = '';
  constructor(private uomService: UnitofmeasureService,
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
    var model = new UnitOfMeasure();
    model.uom = controls.code;
    model.description = controls.value;
    this.uomService.addUOM(model).subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.router.navigate(['/admin/uom']);
      } else if (responce.status == Responsestatus.error) {
        this.openPopup(responce.message);
      } else {
        this.openPopup("Server Error");
      }
    });
  }
  openPopup(mess) {
    debugger;
    this.showAlert = true;
    this.message = mess;
  }
  closePopup() {
    this.showAlert = false;
  }
}
