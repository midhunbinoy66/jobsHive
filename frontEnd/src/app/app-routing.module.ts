import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'user',loadChildren:()=> import('./components/user/user.module').then(m=>m.UserModule)},
  {path:'admin',loadChildren:()=>import('./components/admin/admin.module').then(m=>m.AdminModule)},
  {path:'employer',loadChildren:()=>import('./components/employer/employer.module').then(m=>m.EmployerModule)},
  {path:'',redirectTo:'user',pathMatch:'full'},
  {
    path:'**',
    title:'Page Not Found',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
