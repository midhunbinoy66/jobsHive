import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { EmployerLoginComponent } from './employer-login/employer-login.component';
import { loginGuard } from 'src/app/guards/login.guard';
import { EmployerRegisterComponent } from './employer-register/employer-register.component';

const routes: Routes = [
  {
    path:'home',
    title:'JobHive | Employer',
    component:EmployerHomeComponent
  },
  {
    path:'login',
    title:'JobHive | Employer Login',
    component:EmployerLoginComponent,
    canActivate:[loginGuard]
  },
  {
    path:'register',
    title:'JobHive | Employer Register',
    component:EmployerRegisterComponent,
    canActivate:[loginGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
