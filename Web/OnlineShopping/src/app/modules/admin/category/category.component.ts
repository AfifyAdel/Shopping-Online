import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { Category } from 'src/app/domain/models/category';
import { CategoryService } from 'src/app/domain/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Array<Category>
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  constructor(private categoryService: CategoryService, private SpinnerService: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.getCategories();
  }

  getCategories() {

    this.SpinnerService.show();
    this.categoryService.getCategories().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.categories = responce.resource;
        this.dtTrigger.next();
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
      this.SpinnerService.hide();
    });
  }

  deleteCategory(id) {
    this.categoryService.deleteCategory(id).subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.getCategories();
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
    });
  }

  openAddCategory() {
    this.router.navigate(['/admin/addcategory']);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
