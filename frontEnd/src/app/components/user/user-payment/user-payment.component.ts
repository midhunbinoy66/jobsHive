import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IRazorpayRes, ISubscription } from 'src/app/models/common';
import { IApiPlanRes, IPlan } from 'src/app/models/plans';
import { IUserRes } from 'src/app/models/users';
import { PlanService } from 'src/app/services/plan.service';
import { RazorpayService } from 'src/app/services/razorpay.service';
import { UserService } from 'src/app/services/user.service';
import { saveUserOnStore } from 'src/app/states/user/user.action';
import { selectUserDetails } from 'src/app/states/user/user.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit ,OnDestroy{
  userDetails$ = this.store.pipe(select(selectUserDetails));
  planId:string='';
  plan:IPlan | null =null;
  user:IUserRes | null = null;
  userId:string =''
  private readonly paymentResultSubscription: Subscription;

  constructor(
    private readonly router:Router,
    private readonly route:ActivatedRoute,
    private readonly store:Store,
    private readonly planService:PlanService,
    private readonly razorpayService:RazorpayService,
    private readonly userService:UserService
  ){
    this.paymentResultSubscription = this.razorpayService.getPaymentResutlObservable()
    .subscribe((response:IRazorpayRes | null)=>{
      if(response !== null){
        console.log('payment successfull');
        this.confirmSubscription();
      }else {
        // Payment failed, handle accordingly
          console.log('Payment failed');
        }
    })

  }


  confirmSubscription():void{

    const currentDate = new Date();
    const endDate = this.calculateEndDate(currentDate,this.plan!.duration);
    const planData:ISubscription = {
        planId:this.planId,
        startDate:currentDate,
        endDate:endDate
    }
    console.log(planData);
    this.userService.usrePlanSubscription(this.userId,planData).subscribe({
      next:(res)=>{
          console.log(res.data);
          this.store.dispatch(saveUserOnStore({userDetails:res.data}));
      }
    })
  }

  ngOnInit(): void {

    this.userDetails$.subscribe((res)=>{
      this.user =res;
      this.userId =res!._id
    })

    this.route.params.subscribe(params=>{
      this.planId = params['planId'];
      this.planService.findUserPlan(this.planId).subscribe({
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
  
  calculateEndDate(startDate:Date,duration:number):Date{
    console.log(duration);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth()+duration);
    return endDate
  }

  payWithWallet(planPrice:number):void{
    if(this.user?.wallet !== undefined){
      if(this.user.wallet >=planPrice){
        this.userService.updateUserWallet(this.userId,-planPrice).subscribe({
          next:(res)=>{
            this.user =res.data;
            this.store.dispatch(saveUserOnStore({userDetails:this.user}));
            this.confirmSubscription();
            void Swal.fire('Success','Payment Success Using Wallet','success');
          }
        })
      }
    }

  }

  ngOnDestroy(): void {
    this.paymentResultSubscription.unsubscribe();
  }
}
