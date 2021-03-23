import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { Order } from 'src/app/domain/models/order';
import { OrderService } from 'src/app/domain/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Array<Order>
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  constructor(private orderService: OrderService, private SpinnerService: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'

    };
    this.getOrders();
  }

  getOrders() {

    this.SpinnerService.show();
    this.orderService.getOrders().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.orders = responce.resource;
        this.dtTrigger.next();
        this.SpinnerService.hide();
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
        this.SpinnerService.hide();
      } else { alert("Server Error"); this.SpinnerService.hide(); }

    });
  }
  dateNow() {

    return new Date;
  }


  openOrderDetails(id) {
    debugger;
    this.router.navigate(['/admin/viewdetails/' + id]);
  }
  saveChanges(item: Order) {

    var dudate = (<HTMLInputElement>document.getElementById("dat" + item.id.toString()))?.value;
    var stat = (<HTMLInputElement>document.getElementById("st" + item.id.toString()))?.value;
    if (!(!!dudate)) {
      alert("Duo date not valid!")
      return;
    }
    else {
      var inputDate = new Date(dudate);
      if (new Date(inputDate).getDate() < new Date().getDate()) {
        alert("Duo date not valid!")
        return;
      }
    }
    this.SpinnerService.show();
    item.dueDate = new Date(dudate);
    item.status = Number(stat);

    this.orderService.updateOrder(item).subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        alert("Order Updated successfully")
        this.SpinnerService.hide();
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
        this.SpinnerService.hide();
      } else { alert("Server Error"); this.SpinnerService.hide() }
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
