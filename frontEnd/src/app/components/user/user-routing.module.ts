import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { loginGuard } from 'src/app/guards/login.guard';
import { authGuard } from 'src/app/guards/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { UserJobsComponent } from './user-jobs/user-jobs.component';
import { UserResumeComponent } from './user-resume/user-resume.component';
import { UserSubscriptionComponent } from './user-subscription/user-subscription.component';
import { UserFollowingComponent } from './user-following/user-following.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { WalletHistoryComponent } from '../common/wallet-history/wallet-history.component';
import { UserWalletComponent } from './user-wallet/user-wallet.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';

const routes: Routes = [

  {
    path:'home',
    title:'JobHive| Home',
    component:UserHomeComponent
  },
  {
    path:'register',
    title:'Register',
    component:UserRegisterComponent
  },
  {
    path:'login',
    title:'Login | JobHive',
    component:UserLoginComponent,
    canActivate:[loginGuard]
  },
  {
    path:'profile',
    title:'JobHive | Profile',
    canActivate:[authGuard],
    children:[
      {
        path:'',
        component:UserProfileComponent
      },
      {
        path:'edit',
        component:EditUserProfileComponent
      }
    ]
  },
  {
    path:'jobs',
    title:'JobHive | Jobs',
    component:UserJobsComponent,
    canActivate:[authGuard]
  },
  {
    path:'resume',
    title:'JobHive | Resume',
    component:UserResumeComponent,
    canActivate:[authGuard]
  },
  {
    path:'following',
    title:'JobHive | Resume',
    component:UserFollowingComponent,
    canActivate:[authGuard]
  },
  {
    path:'subscription',
    title:'JobHive | Subscription',
    component:UserSubscriptionComponent,
    canActivate:[authGuard]
  },
  {
    path:'subscription/:planId',
    title:'JobHive | Payment',
    component:UserPaymentComponent,
    canActivate:[authGuard]
  },
  {
    path:'wallet',
    title:'JobHive | Wallet',
    component:UserWalletComponent,
    canActivate:[authGuard]
  },
  {
    path:'messages',
    title:'JobHive | Messages',
    component:UserMessagesComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
