import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { Order } from 'src/app/domain/models/order';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { OrderService } from 'src/app/domain/services/order.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  orders: Array<Order>
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  showAlert: boolean = false;
  message: string = '';
  constructor(private orderService: OrderService, private SpinnerService: NgxSpinnerService,
    private router: Router, private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'

    };
    this.getOrders();
  }

  getOrders() {

    this.SpinnerService.show();
    this.orderService.getCustomerOrders(this.auth.currentUserValue.id).subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.orders = responce.resource;
        this.dtTrigger.next();
        this.SpinnerService.hide();
      } else if (responce.status == Responsestatus.error) {
        this.openPopup(responce.message);
        this.SpinnerService.hide();
      } else { this.openPopup("Server Error"); this.SpinnerService.hide(); }

    });
  }
  dateNow() {

    return new Date;
  }


  openOrderDetails(id) {
    this.router.navigate(['/viewdetails/' + id]);
  }
  getStatus(statusVal) {
    switch (statusVal) {
      case 2:
        return 'Closed'
      default:
        return 'Pendding'
    }
  }
  navigateToHome() {
    this.router.navigate(['/home']);
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
  }
}
