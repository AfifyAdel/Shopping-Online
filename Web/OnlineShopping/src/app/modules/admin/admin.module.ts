import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { UnitOfMeasuresComponent } from './unitOfMeasures/unitOfMeasures.component';
import { TaxesComponent } from './taxes/taxes.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdduomComponent } from './unitOfMeasures/adduom/adduom.component';
import { AddtaxComponent } from './taxes/addtax/addtax.component';
import { AdddiscountComponent } from './discounts/adddiscount/adddiscount.component';




@NgModule({
  declarations: [
    LayoutComponent, ProductsComponent, OrdersComponent, UnitOfMeasuresComponent,
    TaxesComponent, DiscountsComponent, AdduomComponent, AddtaxComponent, AdddiscountComponent
  ],

  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule, ReactiveFormsModule, FormsModule, DataTablesModule, NgxSpinnerModule
  ]
})
export class AdminModule { }
