import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { TaxesComponent } from './taxes/taxes.component';
import { UnitOfMeasuresComponent } from './unitOfMeasures/unitOfMeasures.component';



const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: "", component: ProductsComponent },
      { path: "products", component: ProductsComponent },
      { path: "orders", component: OrdersComponent },
      { path: "taxes", component: TaxesComponent },
      { path: "uom", component: UnitOfMeasuresComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
