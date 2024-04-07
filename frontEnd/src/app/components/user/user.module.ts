import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {environment} from 'src/environments/environment.development'
import { UserRoutingModule } from './user-routing.module';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/states/user/user.reducer';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {  GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { PasswordValidationComponent } from '../common/validation/password-validation/password-validation.component';
import { EmailValidationComponent } from '../common/validation/email-validation/email-validation.component';
import { NameValidationComponent } from '../common/validation/name-validation/name-validation.component';
import { OtpValidationComponent } from '../common/validation/otp-validation/otp-validation.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { UserJobsComponent } from './user-jobs/user-jobs.component';
import { UserSavedJobsComponent } from './user-saved-jobs/user-saved-jobs.component';
import { UserAppliedJobsComponent } from './user-applied-jobs/user-applied-jobs.component';
import { UserResumeComponent } from './user-resume/user-resume.component';
import { MobileValidationComponent } from '../common/validation/mobile-validation/mobile-validation.component';
import { CommonValidationComponent } from '../common/validation/common-validation/common-validation.component';
import { UserSubscriptionComponent } from './user-subscription/user-subscription.component';


@NgModule({
  declarations: [
    UserRegisterComponent,
    UserLoginComponent,
    UserHomeComponent,
    UserNavComponent,
    UserProfileComponent,
    EditUserProfileComponent,
    UserSidebarComponent,
    UserJobsComponent,
    UserSavedJobsComponent,
    UserAppliedJobsComponent,
    UserResumeComponent,
    UserSubscriptionComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('user',userReducer),
    SocialLoginModule,
    PasswordValidationComponent,
    EmailValidationComponent,
    NameValidationComponent,
    OtpValidationComponent,
    MobileValidationComponent,
    CommonValidationComponent
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.google_client_id)
          }
        ]
      } // as SocialAuthServiceConfig,
    }
  ]
})
export class UserModule { }
