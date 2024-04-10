import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { EmployerLoginComponent } from './employer-login/employer-login.component';
import { loginGuard } from 'src/app/guards/login.guard';
import { EmployerRegisterComponent } from './employer-register/employer-register.component';
import { authGuard } from 'src/app/guards/auth.guard';
import { EmployerCreateJobComponent } from './employer-create-job/employer-create-job.component';
import { EmployerJobsComponent } from './employer-jobs/employer-jobs.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EmployerJobApplicantsComponent } from './employer-job-applicants/employer-job-applicants.component';
import { EmployerJobEditComponent } from './employer-job-edit/employer-job-edit.component';

const routes: Routes = [
  {
    path:'home',
    title:'JobHive | Employer',
    component:EmployerHomeComponent,
    canActivate:[authGuard]
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
    path:'profile',
    title:'JobHive | Employer Profile',
    component:EmployerProfileComponent,
    canActivate:[authGuard]
  },
  {
    path:'create-job',
    title:'JobHive | Create Job',
    component:EmployerCreateJobComponent,
    canActivate:[authGuard]
  },
  {
    path:'jobs',
    title:'JobHive | Jobs',
    component:EmployerJobsComponent,
    canActivate:[authGuard]
  },
  {
    path:'job/:jobId',
    title:'JobHive | Job',
    component:EmployerJobApplicantsComponent,
    canActivate:[authGuard]
  },
  {
    path:'edit-job/:jobId',
    title:'JObHive | Edit Job',
    component:EmployerJobEditComponent,
    canActivate:[authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
