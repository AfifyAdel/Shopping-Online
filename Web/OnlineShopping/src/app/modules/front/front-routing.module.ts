import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetail } from 'src/app/domain/models/orderDetail';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { MyordersComponent } from './myorders/myorders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: "", component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'orderdetails', component: OrderDetailsComponent },
      { path: 'myorders', component: MyordersComponent },
      { path: "viewdetails/:id", component: ViewdetailsComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
