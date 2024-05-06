import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerLoginComponent } from './employer-login/employer-login.component';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { EmployerRegisterComponent } from './employer-register/employer-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EmployerApplicanResumeComponent } from './employer-applican-resume/employer-applican-resume.component';
import { EmployerProfileEditComponent } from './employer-profile-edit/employer-profile-edit.component';
import { NameValidationComponent } from '../common/validation/name-validation/name-validation.component';
import { CityValidationComponent } from '../common/validation/city-validation/city-validation.component';
import { StateValidationComponent } from '../common/validation/state-validation/state-validation.component';
import { MobileValidationComponent } from '../common/validation/mobile-validation/mobile-validation.component';
import { DistrictValidationComponent } from '../common/validation/district-validation/district-validation.component';
import { CountryValidationComponent } from '../common/validation/country-validation/country-validation.component';
import { ZipValidationComponent } from '../common/validation/zip-validation/zip-validation.component';
import { CommonValidationComponent } from '../common/validation/common-validation/common-validation.component';
import { EmployerSubscriptionComponent } from './employer-subscription/employer-subscription.component';
import { EmployerPaymentComponent } from './employer-payment/employer-payment.component';
import { EmployerWalletComponent } from './employer-wallet/employer-wallet.component';
import { WalletHistoryComponent } from '../common/wallet-history/wallet-history.component';
import { EmployerFooterComponent } from './employer-footer/employer-footer.component';
import { EmployerMessageComponent } from './employer-message/employer-message.component';
import { MatIconModule } from '@angular/material/icon';

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
    EmployerApplicanResumeComponent,
    EmployerProfileEditComponent,
    EmployerSubscriptionComponent,
    EmployerPaymentComponent,
    EmployerWalletComponent,
    EmployerFooterComponent,
    EmployerMessageComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EmailValidationComponent,
    PasswordValidationComponent,
    OtpValidationComponent,
    SalaryValidationComponent,
    StoreModule.forFeature('employer',employerReducer),
    NameValidationComponent,
    CityValidationComponent,
    StateValidationComponent,
    MobileValidationComponent,
    DistrictValidationComponent,
    CountryValidationComponent,
    ZipValidationComponent,
    CommonValidationComponent,
    SalaryValidationComponent,
    WalletHistoryComponent,
    MatIconModule
    
  ]
})
export class EmployerModule { }
