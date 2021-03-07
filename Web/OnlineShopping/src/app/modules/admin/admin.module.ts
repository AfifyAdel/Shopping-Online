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




@NgModule({
  declarations: [
    LayoutComponent, ProductsComponent, OrdersComponent, UnitOfMeasuresComponent, TaxesComponent, DiscountsComponent
  ],

  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule, ReactiveFormsModule, FormsModule
  ]
})
export class AdminModule { }
