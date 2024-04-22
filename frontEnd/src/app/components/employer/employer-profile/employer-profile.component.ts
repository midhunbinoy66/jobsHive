import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IRazorpayRes } from 'src/app/models/common';
import { IEmployerRes } from 'src/app/models/employer';
import { EmployerService } from 'src/app/services/employer.service';
import { RazorpayService } from 'src/app/services/razorpay.service';
import { saveEmployerOnStore } from 'src/app/states/employer/employer.action';
import { selectEmployerDetails } from 'src/app/states/employer/employrer.selector';
import { AddToWalletComponent } from '../../common/add-to-wallet/add-to-wallet.component';


@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit,OnDestroy{
  
  employerDetails$=this.store.pipe(select(selectEmployerDetails))
  employer!:IEmployerRes
  employerId =''
  moneyToAddToWallet=0;
  private  readonly paymentResultSubscription:Subscription


  constructor(
    private readonly employerService:EmployerService,
    private readonly store:Store,
    private readonly razorpayService:RazorpayService,
    private readonly ngbModal:NgbModal,
    private readonly router:Router
  ){

    this.paymentResultSubscription = this.razorpayService.getPaymentResutlObservable()
    .subscribe((response:IRazorpayRes |null )=>{
      if(response !== null){
        this.employerService.updateEmployerWallet(this.employerId,this.moneyToAddToWallet).subscribe({
          next:(res)=>{
            this.store.dispatch(saveEmployerOnStore({employerDetails:res.data}));
            this.employer = res.data;
          }
        })
      }else{
        console.log('Payment failed');

      }
    })

  }

  ngOnInit(): void {
    this.employerDetails$.subscribe((res)=>{
      if(res !== null)
      this.employer = res
      this.employerId = res!._id
    })
  }



  ngOnDestroy(): void {
    this.paymentResultSubscription.unsubscribe();
  }



  addToWallet():void{
    const modalRef = this.ngbModal.open(AddToWalletComponent,{ backdrop: 'static', centered: true })
    
    void modalRef.result.then(
      (result:{amount:number})=>{
        this.moneyToAddToWallet = result.amount;
        this.razorpayService.initiateRazorpayPayment(result.amount,{
          name:this.employer?.name,
          email:this.employer?.email,
          mobile:(this.employer.mobile !== undefined)?`${this.employer.mobile}`:''
        })
      },
      (reason)=>{
        console.log('modal dismissed with reason',reason);
      }
    )

  }


  openWalletHistory():void{
    void this.router.navigate(['/employer/wallet'])
  }
}
