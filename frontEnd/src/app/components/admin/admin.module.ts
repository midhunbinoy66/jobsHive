import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { TableFilterComponent } from '../common/table-filter/table-filter.component';
import { AdminPlansComponent } from './admin-plans/admin-plans.component';
import { AdminCreatePlanComponent } from './admin-create-plan/admin-create-plan.component';
import { AdminEditPlanComponent } from './admin-edit-plan/admin-edit-plan.component';
import { CommonValidationComponent } from '../common/validation/common-validation/common-validation.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminEmployerMangementComponent } from './admin-employer-mangement/admin-employer-mangement.component';
import { AdminJobManagementComponent } from './admin-job-management/admin-job-management.component';
import { EmailValidationComponent } from '../common/validation/email-validation/email-validation.component';
import { PasswordValidationComponent } from '../common/validation/password-validation/password-validation.component';
import { LineGraphComponent } from '../common/line-graph/line-graph.component';


@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminHomeComponent,
    AdminSidebarComponent,
    AdminUserManagementComponent,
    AdminPlansComponent,
    AdminCreatePlanComponent,
    AdminEditPlanComponent,
    AdminNavComponent,
    AdminEmployerMangementComponent,
    AdminJobManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    TableFilterComponent,
    FormsModule,
    CommonValidationComponent,
    EmailValidationComponent,
    PasswordValidationComponent,
    LineGraphComponent
  ]
})
export class AdminModule { }
