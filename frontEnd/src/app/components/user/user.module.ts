import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user-register/user-register.component';


@NgModule({
  declarations: [
    UserHomeComponent,
    UserNavComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
