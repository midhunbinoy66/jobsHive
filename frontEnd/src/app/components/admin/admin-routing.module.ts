import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { loginGuard } from 'src/app/guards/login.guard';
import { authGuard } from 'src/app/guards/auth.guard';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { AdminCreatePlanComponent } from './admin-create-plan/admin-create-plan.component';
import { AdminPlansComponent } from './admin-plans/admin-plans.component';
import { AdminEditPlanComponent } from './admin-edit-plan/admin-edit-plan.component';
import { AdminEmployerMangementComponent } from './admin-employer-mangement/admin-employer-mangement.component';
import { AdminJobManagementComponent } from './admin-job-management/admin-job-management.component';
import { AdminReportComponent } from './admin-report/admin-report.component';

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
    path:'users',
    title:'JobHive | Users',
    component:AdminUserManagementComponent,
    canActivate:[authGuard]
  },
  {
    path:'employers',
    title:'JobHive | Employers',
    component:AdminEmployerMangementComponent,
    canActivate:[authGuard]
  },
  {
    path:'reports',
    title:'JobHive | Reports',
    component:AdminReportComponent,
    canActivate:[authGuard]
  },
  {
    path:'plans',
    title:'JobHive | Plans',
    component:AdminPlansComponent,
    canActivate:[authGuard]
  },
  {
    path:'create-plan',
    title:'JobHive | Create-Plan',
    component:AdminCreatePlanComponent,
    canActivate:[authGuard]
  },
  {
    path:'plan-edit/:planId',
    title:'JobHive | Edit Plan',
    component:AdminEditPlanComponent,
    canActivate:[authGuard]
  },
  {
    path:'jobs',
    title:'JobHive | Job Mangement',
    component:AdminJobManagementComponent,
    canActivate:[authGuard]
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
