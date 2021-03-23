import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { Discount } from 'src/app/domain/models/discount';
import { Item } from 'src/app/domain/models/item';
import { Order } from 'src/app/domain/models/order';
import { OrderDetail } from 'src/app/domain/models/orderDetail';
import { Tax } from 'src/app/domain/models/tax';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { DiscountService } from 'src/app/domain/services/discount.service';
import { ItemService } from 'src/app/domain/services/item.service';
import { OrderService } from 'src/app/domain/services/order.service';
import { OrderdetailsService } from 'src/app/domain/services/orderdetails.service';
import { TaxService } from 'src/app/domain/services/tax.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  isLoaded: boolean = false;
  products: Array<Item>;
  currentItems: Array<OrderDetail>
  taxes: Array<Tax>;
  discounts: Array<Discount>;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  totalPrice: number = 0;
  showAlert: boolean = false;
  message: string = '';
  goHome: boolean = false;
  constructor(private itemService: ItemService, private SpinnerService: NgxSpinnerService,
    private router: Router, private _discountService: DiscountService,
    private _taxService: TaxService, private currentItemsService: OrderdetailsService,
    private orderService: OrderService, private auth: AuthenticationService) {
  }

  async ngOnInit() {
    this.goHome = false;
    this.SpinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    await this.getProducts();
    await this.getDiscounts();
    await this.getTaxes();
    this.getCurrentItems();
    this.SpinnerService.hide();
    this.isLoaded = true;
  }

  getCurrentItems() {
    this.currentItems = this.currentItemsService.getItems();
    this.dtTrigger.next(this.currentItems);
  }
  async getProducts() {
    this.itemService.getItems().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.products = responce.resource;
      } else if (responce.status == Responsestatus.error) {
        this.openPopup(responce.message);
      } else this.openPopup("Server Error");
    });
  }
  async getTaxes() {
    this._taxService.getTaxes().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.taxes = responce.resource;
      } else if (responce.status == Responsestatus.error) {
        this.openPopup(responce.message);
      } else this.openPopup("Server Error");
    });
  }
  async getDiscounts() {
    this._discountService.getDiscounts().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.discounts = responce.resource;
      } else if (responce.status == Responsestatus.error) {
        this.openPopup(responce.message);
      } else this.openPopup("Server Error");
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
    debugger;
    var tax = this.getTaxValue(item.taxId);
    if (!(!!tax)) tax = 0;
    var discount = this.getDiscountValue(item.discountId);
    if (!(!!discount)) discount = 0;
    var priceTax = ((item.price * (Number)(tax)) / 100) + item.price;
    var pricedis = priceTax - ((priceTax * (Number)(discount)) / 100);
    item.totalPrice = item.quantity * pricedis;
    return item.totalPrice;
  }
  addOne(item: OrderDetail) {
    if (!(!!item))
      return;
    var it = this.products.find(x => x.id == item.itemId);
    if (it) {
      if (it.quantity - 1 > -1) {
        it.quantity = it.quantity - 1;
        item.quantity = item.quantity + 1;
        this.totalPrice += item.totalPrice;
      }
      else {
        this.openPopup("Not more items in store!");
      }
    }
    return;
  }
  minusOne(item: OrderDetail) {
    if (!(!!item))
      return;
    var it = this.products.find(x => x.id == item.itemId);
    if (it) {
      if (item.quantity - 1 > -1) {
        it.quantity = it.quantity + 1;
        item.quantity = item.quantity - 1;
        this.totalPrice -= item.totalPrice;
      }
      else {
        this.openPopup("You don't have any quantity of this item!");
      }
    }
    return;
  }
  deleteItem(item) {

    if (!(!!item))
      return;
    this.currentItemsService.deleteItem(item);
    this.currentItems = this.currentItemsService.getItems();
    this.currentItemsService.prevCount();
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  print() {
    const printContent = document.getElementById("tabpr");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    if (WindowPrt && printContent) {
      WindowPrt.document.write('<link rel="stylesheet" type="text/scss" href="./order-details.component.scss">');
      WindowPrt.document.write(printContent.innerHTML);
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    }
  }
  order() {
    this.SpinnerService.show();
    var newOrder = new Order();
    newOrder.orderDetails = this.currentItems;
    newOrder.requestDate = new Date;
    newOrder.status = 1;
    newOrder.totalPrice = this.getTotalPrice();
    newOrder.userId = this.auth.currentUserValue.id;
    this.orderService.addOrder(newOrder).subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.openPopup("Order done successfully");
        this.SpinnerService.hide();
        this.currentItemsService.orderDone();
        this.goHome = true;
        //this.router.navigate(['/home']);
      } else if (responce.status == Responsestatus.error) {
        this.openPopup(responce.message);
        this.SpinnerService.hide();
      } else {
        this.openPopup("Server Error");
        this.SpinnerService.hide();
      }
    });
  }
  getTotalPrice() {
    var totalPrice = 0;
    this.currentItems.forEach(element => {
      totalPrice += element.totalPrice
    });
    return totalPrice;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  openPopup(mess) {
    debugger;
    this.showAlert = true;
    this.message = mess;
  }
  closePopup() {
    this.showAlert = false;
    if (this.goHome) {
      this.router.navigate(['/home']);
    }
  }
}
