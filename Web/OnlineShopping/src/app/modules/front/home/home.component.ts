import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Apis } from 'src/app/domain/constants/apis';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { ConfigService } from 'src/app/domain/helpers/config.service';
import { Category } from 'src/app/domain/models/category';
import { Discount } from 'src/app/domain/models/discount';
import { Item } from 'src/app/domain/models/item';
import { OrderDetail } from 'src/app/domain/models/orderDetail';
import { Tax } from 'src/app/domain/models/tax';
import { CategoryService } from 'src/app/domain/services/category.service';
import { DiscountService } from 'src/app/domain/services/discount.service';
import { ItemService } from 'src/app/domain/services/item.service';
import { OrderdetailsService } from 'src/app/domain/services/orderdetails.service';
import { TaxService } from 'src/app/domain/services/tax.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Array<Item> = [];
  filteredProducts: Array<Item> = [];
  categories: Category[] = [];
  taxes: Array<Tax>;
  discounts: Array<Discount>;
  myBag: Array<OrderDetail> = [];
  constructor(private itemService: ItemService, private SpinnerService: NgxSpinnerService,
    private router: Router, private _discountService: DiscountService,
    private _taxService: TaxService, private currentItemsService: OrderdetailsService,
    private config: ConfigService, private _categoryService: CategoryService) {
  }


  async ngOnInit() {
    this.SpinnerService.show();
    this.currentItemsService.orderitems.subscribe(c => {
      this.myBag = c;
    });
    await this.getProducts();
    await this.getCategories();
    await this.getDiscounts();
    await this.getTaxes();
    this.SpinnerService.hide();
  }
  fieldsChange(values: any, categoryId): void {
    debugger
    var checked = values.currentTarget.checked;
    if (checked) {
      this.products.forEach(element => {
        if (element.category == categoryId)
          this.filteredProducts.push(element);
      });
    }
    else {
      this.filteredProducts = this.filteredProducts.filter(x => x.category !== categoryId);
    }
    console.log(values.currentTarget.checked);
  }
  async getProducts() {
    this.itemService.getItems().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.products = responce.resource;
        this.filteredProducts = responce.resource;
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

  clacDiscount(price, discountId) {
    if (!(!!price) || !(!!discountId) || !(!!this.discounts))
      return;
    var disc = this.discounts.find(x => x.id == discountId);
    if (disc) {
      return price - ((disc.value * price) / 100);
    }
    return price;
  }
  calcTax(price, taxId) {
    if (!(!!price) || !(!!taxId) || !(!!this.taxes))
      return;
    var tax = this.taxes.find(x => x.id == taxId);
    if (tax) {
      return price + ((tax.value * price) / 100);
    }
    return price;
  }

  getImagePath(path) {
    var img = (path == null || path == "" || path == "undefined") ? "assets/default-product.jpg" : this.config.imagePath + 'ItemsImages/' + path;
    return img;
  }
  filterProducts(id) {
    debugger;
    if (!(!!id))
      return;
    var val = document.getElementById(id);
  }

  addItemToCard(id) {
    if (!(!!id) || !(!!this.products))
      return;
    var prod = this.products.find(x => x.id == id);
    if (prod) {
      var itemEx = this.myBag.find(x => x.itemId == id);
      if (itemEx) {
        alert("Item already exist in your bag!");
        return;
      }
      var ordDetail = new OrderDetail();
      ordDetail.itemId = prod.id;
      ordDetail.price = prod.price;
      ordDetail.taxId = prod.taxId;
      ordDetail.discountId = prod.discountId;
      prod.quantity--;
      ordDetail.quantity = 1;
      this.currentItemsService.addItem(ordDetail);
      this.currentItemsService.nextCount();
    }
    return;
  }
  clearFilters() {
    this.filteredProducts = this.products;
    this.categories.forEach(element => {
      (document.getElementById(element.id.toString()) as HTMLInputElement).checked = true;
    });
  }
}
