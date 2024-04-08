import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerLoginComponent } from './employer-login/employer-login.component';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { EmployerRegisterComponent } from './employer-register/employer-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailValidationComponent } from '../common/validation/email-validation/email-validation.component';
import { PasswordValidationComponent } from '../common/validation/password-validation/password-validation.component';
import { OtpValidationComponent } from '../common/validation/otp-validation/otp-validation.component';
import { EmployerNavComponent } from './employer-nav/employer-nav.component';
import { StoreModule } from '@ngrx/store';
import { employerReducer } from 'src/app/states/employer/employer.reducer';

@NgModule({
  declarations: [
    EmployerLoginComponent,
    EmployerHomeComponent,
    EmployerRegisterComponent,
    EmployerNavComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    ReactiveFormsModule,
    EmailValidationComponent,
    PasswordValidationComponent,
    OtpValidationComponent,
    StoreModule.forFeature('employer',employerReducer)
    
  ]
})
export class EmployerModule { }
