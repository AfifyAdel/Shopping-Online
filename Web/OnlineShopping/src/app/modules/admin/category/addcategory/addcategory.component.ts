import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { Category } from 'src/app/domain/models/category';
import { CategoryService } from 'src/app/domain/services/category.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {

  addForm: FormGroup;
  validationMsgAdd: string;
  validationErrorAdd: boolean;
  submittedAdd: boolean = false;
  showAlert: boolean = false;
  message: string = '';
  constructor(private categoryService: CategoryService,
    private _formBuilder: FormBuilder, private router: Router) {
    this.createAddForm();
  }

  ngOnInit() {
  }
  createAddForm() {
    this.addForm = this._formBuilder.group(
      {
        name: new FormControl("", Validators.required),
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
    var model = new Category();
    model.name = controls.name;
    this.categoryService.addCategory(model).subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.router.navigate(['/admin/categories']);
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
