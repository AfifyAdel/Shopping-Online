import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Responsestatus } from 'src/app/domain/constants/enums/responsestatus.enum';
import { UnitOfMeasure } from 'src/app/domain/models/unitOfMeasure';
import { UnitofmeasureService } from 'src/app/domain/services/unitofmeasure.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-unitOfMeasures',
  templateUrl: './unitOfMeasures.component.html',
  styleUrls: ['./unitOfMeasures.component.scss']
})
export class UnitOfMeasuresComponent implements OnInit {
  uoms: Array<UnitOfMeasure>
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  showAlert: boolean = false;
  message: string = '';
  constructor(private uomService: UnitofmeasureService, private SpinnerService: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'

    };
    this.getUOMs();
  }

  getUOMs() {

    this.SpinnerService.show();
    this.uomService.getUOMs().subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.uoms = responce.resource;
        this.dtTrigger.next();
      } else if (responce.status == Responsestatus.error) {
        this.openPopup(responce.message);
      } else this.openPopup("Server Error");
      this.SpinnerService.hide();
    });
  }

  deleteUOM(id) {
    this.uomService.deleteUOM(id).subscribe(responce => {
      if (responce.resource && responce.status == Responsestatus.success) {
        this.getUOMs();
      } else if (responce.status == Responsestatus.error) {
        this.openPopup(responce.message);
      } else this.openPopup("Server Error");
    });
  }

  openAddUOM() {
    this.router.navigate(['/admin/adduom']);
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



