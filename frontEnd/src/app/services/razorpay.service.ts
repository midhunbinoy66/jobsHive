import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IRazorpayRes } from '../models/common';
import { environment } from 'src/environments/environment.development';


interface IUserPayment {
  name: string
  email: string
  mobile: string
}

declare var Razorpay: any

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  private readonly options:any
  private readonly paymentResultSubject = new Subject<IRazorpayRes | null>();


  constructor() { 
    this.options = {
      "key": environment.razorpayPublicKey,
      "amount": 1000000000, // amount in paise (Rupees x 100)
      "currency": 'INR',
      "name": 'CineSnap',
      "description": 'Payment for Booking Movie',
      "image": '../../../assets/logo-1x1.png',
      "order_id": '', // Replace with your order ID
      "handler": (response: IRazorpayRes) => { this.paymentResultSubject.next(response); },
      "prefill": {
        "name": '',
        "email": '',
        "contact": ''
      },
      "notes": {
        "address": 'JobHive Private Limited'
      },
      "theme": {
        "color": '#f2bd00'
      }
    }
  }

  getPaymentResutlObservable():Observable<null | IRazorpayRes>{
    return this.paymentResultSubject.asObservable();
  }

  initiateRazorpayPayment(amount:number,user:IUserPayment):void{
    this.options.prefill.name = user.name;
    this.options.prefill.email = user.email;
    this.options.prefill.contact = user.mobile;
    this.options.amount = amount *100;

    const rzp = new Razorpay(this.options);
    rzp.open();
  }
}
