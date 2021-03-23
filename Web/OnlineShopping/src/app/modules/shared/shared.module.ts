import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SliderComponent } from './slider/slider.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [LoginComponent, NotFoundComponent, RegisterComponent, NavBarComponent, SideBarComponent, SliderComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    DataTablesModule
  ],
  exports: [LoginComponent, NotFoundComponent, RegisterComponent, NavBarComponent, SideBarComponent, SliderComponent]
})
export class SharedModule { }
