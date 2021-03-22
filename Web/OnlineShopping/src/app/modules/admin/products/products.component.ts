import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { Category } from 'src/app/domain/models/category';
import { Discount } from 'src/app/domain/models/discount';
import { Item } from 'src/app/domain/models/item';
import { Tax } from 'src/app/domain/models/tax';
import { UnitOfMeasure } from 'src/app/domain/models/unitOfMeasure';
import { CategoryService } from 'src/app/domain/services/category.service';
import { DiscountService } from 'src/app/domain/services/discount.service';
import { ItemService } from 'src/app/domain/services/item.service';
import { TaxService } from 'src/app/domain/services/tax.service';
import { UnitofmeasureService } from 'src/app/domain/services/unitofmeasure.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Array<Item>;
  categories: Category[] = [];
  taxes: Array<Tax>;
  discounts: Array<Discount>;
  uoms: Array<UnitOfMeasure>;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  constructor(private itemService: ItemService, private SpinnerService: NgxSpinnerService,
    private router: Router, private _discountService: DiscountService,
    private _taxService: TaxService, private _uomService: UnitofmeasureService, private _categoryService: CategoryService) {
  }

  async ngOnInit() {
    this.SpinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    await this.getProducts();
    await this.getDiscounts();
    await this.getTaxes();
    await this.getUOMs();
    this.SpinnerService.hide();
  }

  async getProducts() {
    this.itemService.getItems().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.products = responce.resource;
        this.dtTrigger.next(this.products);
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
    });
  }
  async getCategories() {

    this.SpinnerService.show();
    this._categoryService.getCategories().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.categories = responce.resource;
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
      this.SpinnerService.hide();
    });
  }
  async getTaxes() {
    this._taxService.getTaxes().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.taxes = responce.resource;
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
    });
  }
  async getDiscounts() {
    this._discountService.getDiscounts().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.discounts = responce.resource;
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
    });
  }

  async getUOMs() {
    this._uomService.getUOMs().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.uoms = responce.resource;
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
    });
  }

  getCategoryName(id) {
    if (!(!!id) || !(!!this.categories))
      return;
    return this.categories.find(x => x.id == id)?.name;
  }
  getTax(id) {
    if (!(!!id) || !(!!this.taxes))
      return;
    return this.taxes.find(x => x.id == id)?.code;
  }
  getDiscount(id) {
    if (!(!!id) || !(!!this.discounts))
      return;
    return this.discounts.find(x => x.id == id)?.code;
  }
  getUOM(id) {
    if (!(!!id) || !(!!this.uoms))
      return;
    return this.uoms.find(x => x.id == id)?.uom;
  }

  deleteProduct(id) {
    this.itemService.deleteItem(id).subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.getUOMs();
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
    });
  }
  editProduct(id) {
    this.router.navigate(['/admin/edititem/' + id]);
  }

  openAddProduct() {
    this.router.navigate(['/admin/additem']);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
