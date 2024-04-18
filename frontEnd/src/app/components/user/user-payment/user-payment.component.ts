import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IRazorpayRes } from 'src/app/models/common';
import { IApiPlanRes, IPlan } from 'src/app/models/plans';
import { IUserRes } from 'src/app/models/users';
import { PlanService } from 'src/app/services/plan.service';
import { RazorpayService } from 'src/app/services/razorpay.service';
import { selectUserDetails } from 'src/app/states/user/user.selector';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit{
  userDetails$ = this.store.pipe(select(selectUserDetails));
  planId:string='';
  plan:IPlan | null =null;
  user:IUserRes | null = null;
  private readonly paymentResultSubscription: Subscription;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private store:Store,
    private planService:PlanService,
    private razorpayService:RazorpayService
  ){
    this.paymentResultSubscription = this.razorpayService.getPaymentResutlObservable()
    .subscribe((response:IRazorpayRes | null)=>{
      if(response !== null){
        console.log('payment successfull');
      }else {
        // Payment failed, handle accordingly
          console.log('Payment failed');
        }
    })

  }

  ngOnInit(): void {

    this.userDetails$.subscribe((res)=>{
      this.user =res;
    })

    this.route.params.subscribe(params=>{
      const planId = params['planId'];
      this.planService.findUserPlan(planId).subscribe({
        next:(res)=>{
          this.plan = res.data
        }
      })
    })  
  }


  payforSusbcription(amount:number):void{
    this.razorpayService.initiateRazorpayPayment(amount,{
      name:this.user!.name,
      email:this.user!.email,
      mobile:(this.user!.mobile !== undefined) ? `${this.user!.mobile}` : ''
    })
  }
  
}
