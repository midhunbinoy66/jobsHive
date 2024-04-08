import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { loginGuard } from 'src/app/guards/login.guard';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path:'home',
    title:'JobHive | Dashboard',
    component:AdminHomeComponent,
    canActivate:[authGuard]
  },
  {
    path:'login',
    title:'Admin Login',
    component:AdminLoginComponent,
    canActivate:[loginGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
