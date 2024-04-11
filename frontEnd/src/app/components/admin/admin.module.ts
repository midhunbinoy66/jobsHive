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


@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminHomeComponent,
    AdminSidebarComponent,
    AdminUserManagementComponent,
    AdminPlansComponent,
    AdminCreatePlanComponent,
    AdminEditPlanComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    TableFilterComponent,
    FormsModule,
    CommonValidationComponent
  ]
})
export class AdminModule { }
