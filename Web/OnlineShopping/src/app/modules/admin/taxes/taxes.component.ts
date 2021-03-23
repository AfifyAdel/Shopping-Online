import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { Tax } from 'src/app/domain/models/tax';
import { TaxService } from 'src/app/domain/services/tax.service';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnDestroy, OnInit {

  taxes: Tax[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  showAlert: boolean = false;
  message: string = '';
  constructor(private taxService: TaxService, private SpinnerService: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.getTaxes();
  }

  getTaxes() {
    this.taxService.getTaxes().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.taxes = responce.resource;
        this.dtTrigger.next();
      } else if (responce.status == Responsestatus.error) {
        this.openPopup(responce.message);
      } else this.openPopup("Server Error");
    });
  }

  deleteTax(id) {
    this.taxService.deleteTax(id).subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.getTaxes();
      } else if (responce.status == Responsestatus.error) {
        this.openPopup(responce.message);
      } else this.openPopup("Server Error");
    });
  }

  openAddTax() {
    this.router.navigate(['/admin/addtax']);
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
