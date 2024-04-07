import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IPlan } from 'src/app/models/plans';
import { IUserRes} from 'src/app/models/users';
import { PlanService } from 'src/app/services/plan.service';
import { selectUserDetails } from 'src/app/states/user/user.selector';

@Component({
  selector: 'app-user-subscription',
  templateUrl: './user-subscription.component.html',
  styleUrls: ['./user-subscription.component.css']
})
export class UserSubscriptionComponent implements OnInit {
    userDetails$ = this.store.pipe(select(selectUserDetails));
    user:IUserRes | null = null;
    allPlans:IPlan[]| null = null;
    userPlanId:string|undefined =undefined
    userPlan:IPlan | undefined = undefined;

  constructor(
    private readonly store:Store,
    private readonly planService:PlanService
  ){}

  ngOnInit(): void {
    this.userDetails$.subscribe((res)=>{
      this.user = res;
      this.userPlanId = res?.subscription?.planId;
    })

    this.planService.findAllPlans().subscribe({
      next:(res)=>{
        this.allPlans = res.data;
        console.log(this.allPlans);
      }
    })

    if(this.userPlanId ! == undefined){
      this.userPlan = this.allPlans?.find(plan => plan._id === this.userPlanId);
    }

}


}
