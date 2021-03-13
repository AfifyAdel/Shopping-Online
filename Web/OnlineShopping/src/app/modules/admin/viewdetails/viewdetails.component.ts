import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { Discount } from 'src/app/domain/models/discount';
import { Item } from 'src/app/domain/models/item';
import { OrderDetail } from 'src/app/domain/models/orderDetail';
import { Tax } from 'src/app/domain/models/tax';
import { DiscountService } from 'src/app/domain/services/discount.service';
import { ItemService } from 'src/app/domain/services/item.service';
import { OrderService } from 'src/app/domain/services/order.service';
import { TaxService } from 'src/app/domain/services/tax.service';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.scss']
})
export class ViewdetailsComponent implements OnInit {

  isLoaded: boolean = false;
  products: Array<Item>;
  currentItems1: Array<OrderDetail>
  taxes: Array<Tax>;
  discounts: Array<Discount>;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  totalPrice: number = 0;
  constructor(private itemService: ItemService, private SpinnerService: NgxSpinnerService,
    private router: Router, private _discountService: DiscountService,
    private _taxService: TaxService, private activeRoute: ActivatedRoute,
    private orderService: OrderService) {
  }

  async ngOnInit() {
    this.SpinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    await this.getOrderItems();
    await this.getProducts();
    await this.getDiscounts();
    await this.getTaxes();
    this.SpinnerService.hide();
    this.isLoaded = true;
  }
  async getOrderItems() {
    this.activeRoute.paramMap.subscribe(param => {

      var id = param.get('id');
      if (id != null) {
        this.orderService.getOrderItems(Number(id)).subscribe(responce => {
          if (responce.resource && responce.status == Responsestatus.success) {
            this.currentItems1 = responce.resource;
            let unique = new Array<OrderDetail>();
            this.currentItems1.forEach(element => {
              if (!(!!unique.find(x => x.itemId === element.itemId)))
                unique.push(element)
            });
            this.currentItems1 = unique;
            this.dtTrigger.next();
          } else if (responce.status == Responsestatus.error) {
            alert(responce.message);
          } else alert("Server Error");
        });
      }
    })
  }
  async getProducts() {
    this.itemService.getItems().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.products = responce.resource;
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
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
  getItemName(itemId) {
    if (!(!!itemId) || !(!!this.products))
      return;
    var it = this.products.find(x => x.id == itemId);
    if (it)
      return it.name;
    return '';
  }
  getTaxValue(taxId) {
    if (!(!!taxId) || !(!!this.taxes))
      return;
    var it = this.taxes.find(x => x.id == taxId);
    if (it)
      return it.value;
    return '';
  }
  getDiscountValue(discountId) {
    if (!(!!discountId) || !(!!this.discounts))
      return;
    var it = this.discounts.find(x => x.id == discountId);
    if (it)
      return it.value;
    return '';
  }
  getPrice(item: OrderDetail) {
    if (!(!!item) || !(!!this.discounts) || !(!!this.taxes))
      return;
    var tax = this.getTaxValue(item.taxId);
    var discount = this.getDiscountValue(item.discountId);
    var priceTax = ((item.price * (Number)(tax)) / 100) + item.price;
    var pricedis = priceTax - ((priceTax * (Number)(discount)) / 100);
    item.totalPrice = item.quantity * pricedis;
    return item.totalPrice;
  }

  navigateToOrders() {
    this.router.navigate(['/admin/orders']);
  }
}
