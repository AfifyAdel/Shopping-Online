import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewdetailsComponent } from '../front/viewdetails/viewdetails.component';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { CategoryComponent } from './category/category.component';
import { AdddiscountComponent } from './discounts/adddiscount/adddiscount.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { LayoutComponent } from './layout/layout.component';
import { OrdersComponent } from './orders/orders.component';
import { AddproductComponent } from './products/addproduct/addproduct.component';
import { ProductsComponent } from './products/products.component';
import { AddtaxComponent } from './taxes/addtax/addtax.component';
import { TaxesComponent } from './taxes/taxes.component';
import { AdduomComponent } from './unitOfMeasures/adduom/adduom.component';
import { UnitOfMeasuresComponent } from './unitOfMeasures/unitOfMeasures.component';



const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: "", component: ProductsComponent },
      { path: "products", component: ProductsComponent },
      { path: "orders", component: OrdersComponent },
      { path: "taxes", component: TaxesComponent },
      { path: "uom", component: UnitOfMeasuresComponent },
      { path: "discounts", component: DiscountsComponent },
      { path: "adduom", component: AdduomComponent },
      { path: "addtax", component: AddtaxComponent },
      { path: "adddiscount", component: AdddiscountComponent },
      { path: "additem", component: AddproductComponent },
      { path: "edititem/:id", component: AddproductComponent },
      { path: "categories", component: CategoryComponent },
      { path: "addcategory", component: AddcategoryComponent },
      { path: "viewdetails/:id", component: ViewdetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
