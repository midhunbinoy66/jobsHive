import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
  {
    path:'home',
    component:UserHomeComponent
  },
  {
    path:'login',
    title:'Login',
    component:UserLoginComponent
  },
  {
    path:'register',
    title:'Register',
    component:UserRegisterComponent
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
