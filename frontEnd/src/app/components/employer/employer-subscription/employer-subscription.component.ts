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
  
      this.planService.findAllPlans().subscribe({
        next:(res)=>{
          this.plans = res.data!.filter(plan=>plan.type === 'employer');
            this.employerPlan = this.plans.find(plan=>plan._id === this.emploeyr?.subscription?.planId)    
        }
      })
    }

    goToDetails(planId:string){
      this.router.navigate([`employer/subscription/${planId}`]);
    }
}
