import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IRazorpayRes, ISubscription } from 'src/app/models/common';
import { IEmployerRes } from 'src/app/models/employer';
import { IPlan } from 'src/app/models/plans';
import { EmployerService } from 'src/app/services/employer.service';
import { PlanService } from 'src/app/services/plan.service';
import { RazorpayService } from 'src/app/services/razorpay.service';
import { saveEmployerOnStore } from 'src/app/states/employer/employer.action';
import { selectEmployerDetails } from 'src/app/states/employer/employrer.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employer-payment',
  templateUrl: './employer-payment.component.html',
  styleUrls: ['./employer-payment.component.css']
})
export class EmployerPaymentComponent implements OnInit {
  employerDetails$ = this.store.pipe(select(selectEmployerDetails));
  planId = ''
  plan!:IPlan
  employer:IEmployerRes | null = null;
  employerId =''


  private readonly paymentResultSubscription: Subscription;
  constructor(
    private readonly store:Store,
    private readonly router:Router,
    private readonly route:ActivatedRoute,
    private readonly planService:PlanService,
    private readonly razorpayService:RazorpayService,
    private readonly employerService:EmployerService
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
    this.employerService.employerPlanSubscription(this.employerId,planData).subscribe({
      next:(res)=>{
          console.log(res.data);
          this.store.dispatch(saveEmployerOnStore({employerDetails:res.data}));
          this.router.navigate(['/employer/subscription'])
      }
    })
  }

  ngOnInit(): void {

      this.employerDetails$.subscribe(res=>{
        this.employer = res
        this.employerId = res!._id
      })

      this.route.params.subscribe(params=>{
        this.planId = params['planId'];
        this.planService.findUserPlan(this.planId).subscribe({
          next:(res)=>{
            if(res.data !== null){
              this.plan = res.data
            }
          }
        })
      })
  }


  payforSusbcription(amount:number):void{
    this.razorpayService.initiateRazorpayPayment(amount,{
      name:this.employer!.name,
      email:this.employer!.email,
      mobile:(this.employer!.mobile !== undefined) ? `${this.employer!.mobile}` : ''
    })
  }
  
  calculateEndDate(startDate:Date,duration:number):Date{
    console.log(duration);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth()+duration);
    return endDate
  }



  ngOnDestroy(): void {
    this.paymentResultSubscription.unsubscribe();
  }

  payUsingWallet(){
    if(this.employer?.wallet){
      if(this.plan.price<this.employer?.wallet){
        this.confirmSubscription()
        void Swal.fire('Success','Payment completed','success');
        this.router.navigateByUrl('/employer/subscription')
      }else{
        void Swal.fire('Oops','Insufficient Balance','error');
      }
    }
  }
}

