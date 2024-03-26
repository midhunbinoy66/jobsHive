import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validateByTrimming } from '../../../helpers/validations';
import { emailValidators, nameValidators, passwordValidators } from '../../../shared/validators';
import { MAX_OTP_LIMIT, OTP_RESEND_MAX_TIME, OTP_TIMER } from '../../../shared/constants';
import { formatTime } from '../../../helpers/timer';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { saveUserOnStore } from '../../../states/user/user.action';
import { IUserRes } from '../../../models/users';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit{
  form!:FormGroup ;
  isSubmitted=false;
  showOtpField = false;
  remainingTime =0;
  formattedTime: string = '03:00'
  otpResendCount: number = 0
  showOTPResend: boolean = true
  constructor(
      @Inject(HttpClient) private readonly http:HttpClient,
      @Inject(Router) private readonly router:Router,
      @Inject(FormBuilder) private readonly formBuilder:FormBuilder,
      @Inject(Store) private readonly store:Store
  ){}


    ngOnInit(): void {
      this.form = this.formBuilder.group({
        name:['',[validateByTrimming(nameValidators)]],
        email:['',[validateByTrimming(emailValidators)]],
        password:['',[validateByTrimming(passwordValidators)]],
        confirmPassword:['',[validateByTrimming(passwordValidators)]],
        mobile:['',Validators.required]
      })
    }

get f():Record<string,AbstractControl>{
  return this.form.controls;
}

    startTimer(){
      this.remainingTime = OTP_TIMER;
      const timer = setInterval(()=>{
        this.remainingTime--;
        if(this.remainingTime<=0){
          clearInterval(timer);
          console.log('otp expired');
        }
        this.formattedTime =formatTime(this.remainingTime)
      },1000)
    }

    resendOTP(){
      if(this.otpResendCount<MAX_OTP_LIMIT){
        this.http.get('user/resendOtp').subscribe({
          next:()=>{
            console.log('otp successfully resent');
            void Swal.fire('OTP sent','check your email for otp','success');
            this.startTimer();
            this.otpResendCount++;
          }
        })
      }else{
        void Swal.fire('oops!','Maximum resend attempts reached','warning')
      }
    }


    onSubmit():void{
        this.isSubmitted = true;  
        console.log(this.form.getRawValue())
        if(!this.showOtpField && !this.form.invalid){
          const user = this.form.getRawValue();
          this.http.post('user/register',user).subscribe({
            next:(res:any)=>{
              localStorage.setItem('userAuthToken', res.token)
              this.showOtpField  =true;
              this.form.get('name')?.disable();
              this.form.get('email')?.disable();
              this.form.get('password')?.disable();
              this.form.get('confirmPassword')?.disable();
              this.form.get('otp')?.enable();
              this.startTimer();
              setTimeout(() => {
                  this.showOTPResend = false;
              }, OTP_RESEND_MAX_TIME);
            }
          })
        }else if ( !this.form.invalid && this.showOtpField){
          const user = this.form.getRawValue();
          console.log(user);
          console.log(user.otp);
          const otp = user.otp
          this.http.post('user/validateOtp',{otp}).subscribe({
            next:(res:any)=>{
              localStorage.setItem('userAccessToken',res.accessToken);
              localStorage.setItem('userRefreshToken', res.refreshToken)
              localStorage.removeItem('userAuthToken');
              this.store.dispatch(saveUserOnStore({userDetails:res.data as IUserRes}))
              void this.router.navigate(['/']);
            }
          })
        }else{
          console.log('error',this.form.errors);
        }
      }

}
