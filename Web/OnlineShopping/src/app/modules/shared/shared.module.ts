import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AdminModule } from '../admin/admin.module';

@NgModule({
  declarations: [LoginComponent, NotFoundComponent, RegisterComponent, NavBarComponent, SideBarComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent, NotFoundComponent, RegisterComponent, NavBarComponent, SideBarComponent]
})
export class SharedModule { }
