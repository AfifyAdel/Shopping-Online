import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { Discount } from 'src/app/domain/models/discount';
import { DiscountService } from 'src/app/domain/services/discount.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnDestroy, OnInit {
  discounts: Array<Discount>
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  constructor(private discountService: DiscountService, private SpinnerService: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.getDiscounts();
  }

  getDiscounts() {

    this.SpinnerService.show();
    this.discountService.getDiscounts().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.discounts = responce.resource;
        this.dtTrigger.next();
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
      this.SpinnerService.hide();
    });
  }

  deleteDiscount(id) {
    this.discountService.deleteDiscount(id).subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.getDiscounts();
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
    });
  }

  openAddDiscount() {
    this.router.navigate(['/admin/adddiscount']);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
