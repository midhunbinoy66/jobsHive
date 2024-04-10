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
import { EmployerCreateJobComponent } from './employer-create-job/employer-create-job.component';
import { SalaryValidationComponent } from '../common/validation/salary-validation/salary-validation.component';
import { EmployerJobsComponent } from './employer-jobs/employer-jobs.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EmployerSidebarComponent } from './employer-sidebar/employer-sidebar.component';
import { EmployerJobEditComponent } from './employer-job-edit/employer-job-edit.component';
import { EmployerJobApplicantsComponent } from './employer-job-applicants/employer-job-applicants.component';

@NgModule({
  declarations: [
    EmployerLoginComponent,
    EmployerHomeComponent,
    EmployerRegisterComponent,
    EmployerNavComponent,
    EmployerCreateJobComponent,
    EmployerJobsComponent,
    EmployerProfileComponent,
    EmployerSidebarComponent,
    EmployerJobEditComponent,
    EmployerJobApplicantsComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    ReactiveFormsModule,
    EmailValidationComponent,
    PasswordValidationComponent,
    OtpValidationComponent,
    SalaryValidationComponent,
    StoreModule.forFeature('employer',employerReducer)
    
  ]
})
export class EmployerModule { }
