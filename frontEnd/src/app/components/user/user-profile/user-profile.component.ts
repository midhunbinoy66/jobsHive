import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IRazorpayRes } from 'src/app/models/common';
import { IUserRes } from 'src/app/models/users';
import { RazorpayService } from 'src/app/services/razorpay.service';
import { UserService } from 'src/app/services/user.service';
import { saveUserOnStore } from 'src/app/states/user/user.action';
import { selectUserDetails, selectUserState } from 'src/app/states/user/user.selector';
import { AddToWalletComponent } from '../../common/add-to-wallet/add-to-wallet.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit,OnDestroy{
  user!:IUserRes
  userId:string =''
  userDetails$ = this.store.pipe(select(selectUserDetails));
  moneyToAddToWallet = 0
  private readonly paymentResultSubscription:Subscription

  constructor(
    private readonly store:Store,
    private readonly razorpayService:RazorpayService,
    private readonly router:Router,
    private readonly userService:UserService,
    private readonly ngbModal:NgbModal
  ){  

    this.paymentResultSubscription = this.razorpayService.getPaymentResutlObservable()
    .subscribe((response:IRazorpayRes | null)=>{
      if(response !== null ){
        this.userService.updateUserWallet(this.userId,this.moneyToAddToWallet).subscribe({
          next:(res)=>{
            this.store.dispatch(saveUserOnStore({userDetails:res.data}));
           this.getUserDetails();
          }
        })
      }else{
        console.log('Payment failed');
      }
    })

  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    this.userDetails$.subscribe((user)=>{
      if(user!== null){
        this.user = user;
        this.userId = user._id
      }
    })
  }


  ngOnDestroy(): void {
    this.paymentResultSubscription.unsubscribe();
  }


  addToWallet():void{
    const modalRef = this.ngbModal.open(AddToWalletComponent,{ backdrop: 'static', centered: true })

    void modalRef.result.then(
      (result:{amount:number})=>{
        this.moneyToAddToWallet = result.amount
        this.razorpayService.initiateRazorpayPayment(result.amount,{
          name:this.user.name,
          email:this.user.email,
          mobile:(this.user.mobile !== undefined)?`${this.user.mobile}`:''
        })
      },
      (reason)=>{
        console.log('modal dismissed with reason',reason);
      }
    )
  }


  openWalletHistory():void{
    void this.router.navigate(['/user/wallet'])
  }
}
