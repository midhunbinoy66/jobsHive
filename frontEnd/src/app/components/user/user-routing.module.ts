import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { loginGuard } from 'src/app/guards/login.guard';

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
