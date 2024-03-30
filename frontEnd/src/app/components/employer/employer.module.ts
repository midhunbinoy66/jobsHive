import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerLoginComponent } from './employer-login/employer-login.component';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { EmployerRegisterComponent } from './employer-register/employer-register.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployerLoginComponent,
    EmployerHomeComponent,
    EmployerRegisterComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployerModule { }
