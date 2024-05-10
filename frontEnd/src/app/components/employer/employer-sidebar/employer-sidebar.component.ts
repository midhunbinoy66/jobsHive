import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IEmployerRes } from 'src/app/models/employer';
import { IPlan } from 'src/app/models/plans';
import { PlanService } from 'src/app/services/plan.service';
import { deleteEmployreFromStore } from 'src/app/states/employer/employer.action';
import { selectEmployerDetails } from 'src/app/states/employer/employrer.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employer-sidebar',
  templateUrl: './employer-sidebar.component.html',
  styleUrls: ['./employer-sidebar.component.css']
})
export class EmployerSidebarComponent implements OnInit{

  showSidebar=false
  employer$ = this.store.pipe(select(selectEmployerDetails));
  employer:IEmployerRes | null = null;
  employerPlan:IPlan | null =null;

  constructor(
    private readonly store:Store,
    private readonly router:Router,
    private readonly planService:PlanService
  ){}

  ngOnInit() {
    this.checkWindowWidth();  
    this.employer$.subscribe((res)=>{
      this.employer = res;
    })

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowWidth();
  }

  checkWindowWidth() {
    this.showSidebar = window.innerWidth >= 768;
  }


  toggleSidebar(){
    this.showSidebar = !this.showSidebar
  }



  logout(){
    localStorage.removeItem('employerAccessToken');
    localStorage.removeItem('employerRefreshToken');
    this.store.dispatch(deleteEmployreFromStore());
    void this.router.navigate(['/employer/login'])
  }

  onPlanCheck(){
    if(this.employer?.subscription){
      this.planService.findUserPlan(this.employer.subscription.planId).subscribe({
        next:(res)=>{
          this.employerPlan = res.data;
          if(this.employerPlan?.features.chatFacility){
            this.router.navigateByUrl('employer/messages')
          }else{
            void Swal.fire('Oops','Your plan does not support this feature','error')
          }
        }
      })
    }else{
      void Swal.fire('Oops','Please Subscribe to avail this feature');
    }
  }
}
