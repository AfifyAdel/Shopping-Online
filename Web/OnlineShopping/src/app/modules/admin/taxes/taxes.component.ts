import { Component, OnInit } from '@angular/core';
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
export class TaxesComponent implements OnInit {

  taxes: Array<Tax>
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  constructor(private taxService: TaxService, private SpinnerService: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'

    };
    this.getTaxes();
  }

  getTaxes() {
    debugger;
    this.SpinnerService.show();
    this.taxService.getTaxes().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.taxes = responce.resource;
        this.dtTrigger.next();
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
      this.SpinnerService.hide();
    });
  }

  deleteTax(id) {
    this.taxService.deleteTax(id).subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.getTaxes();
      } else if (responce.status == Responsestatus.error) {
        alert(responce.message);
      } else alert("Server Error");
    });
  }

  openAddTax() {
    this.router.navigate(['/admin/addtax']);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
