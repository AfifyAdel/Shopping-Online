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
import { Register2Component } from './register2/register2.component';

@NgModule({
  declarations: [LoginComponent, NotFoundComponent, RegisterComponent, NavBarComponent, SideBarComponent, Register2Component],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [LoginComponent, NotFoundComponent, RegisterComponent, NavBarComponent, SideBarComponent]
})
export class SharedModule { }
