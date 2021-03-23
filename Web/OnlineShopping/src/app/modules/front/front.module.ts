import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FrontRoutingModule } from './front-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { DataTablesModule } from 'angular-datatables';
import { MyordersComponent } from './myorders/myorders.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';



@NgModule({
  declarations: [
    HomeComponent, LayoutComponent, OrderDetailsComponent, MyordersComponent, ViewdetailsComponent
  ],
  providers: [
    DatePipe
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    SharedModule,
    ReactiveFormsModule, FormsModule, NgxSpinnerModule, DataTablesModule
  ]
})
export class FrontModule { }
