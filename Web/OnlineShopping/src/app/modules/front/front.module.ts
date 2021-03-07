import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FrontRoutingModule } from './front-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';



@NgModule({
  declarations: [
    HomeComponent, LayoutComponent
  ],
  providers: [
    DatePipe
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    SharedModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class FrontModule { }
