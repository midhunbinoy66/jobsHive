import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IEmployerRes } from 'src/app/models/employer';
import { IPlan } from 'src/app/models/plans';
import { PlanService } from 'src/app/services/plan.service';
import { selectEmployerDetails } from 'src/app/states/employer/employrer.selector';

@Component({
  selector: 'app-employer-subscription',
  templateUrl: './employer-subscription.component.html',
  styleUrls: ['./employer-subscription.component.css']
})
export class EmployerSubscriptionComponent implements OnInit{
  pageNumber=1;
  pageSize =10;
  employerDetails$  = this.store.pipe(select(selectEmployerDetails));
  emploeyr:IEmployerRes | null = null;
  plans:IPlan[] | null=[];
  employerPlan:IPlan | undefined;

  constructor(
    private readonly router:Router,
    private readonly store:Store,
    private readonly planService:PlanService
  ){}


  ngOnInit(): void {

      this.employerDetails$.subscribe((res)=>{
        this.emploeyr = res;
      })
  
      this.planService.findAllPlans(this.pageNumber,this.pageSize).subscribe({
        next:(res)=>{
          if(res.data?.plans){
            this.plans = res.data!.plans.filter(plan=>plan.type === 'employer');
            this.employerPlan = this.plans.find(plan=>plan._id === this.emploeyr?.subscription?.planId) 
          }
        }
      })
    }

    goToDetails(planId:string){
      this.router.navigate([`employer/subscription/${planId}`]);
    }
}
