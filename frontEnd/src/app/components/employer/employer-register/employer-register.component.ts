import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { formatTime } from 'src/app/helpers/timer';
import { passwordMatchValidator, validateByTrimming } from 'src/app/helpers/validations';
import { MAX_OTP_LIMIT, OTP_RESEND_MAX_TIME, OTP_TIMER } from 'src/app/shared/constants';
import { emailValidators, nameValidators, otpValidators, passwordValidators } from 'src/app/shared/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employer-register',
  templateUrl: './employer-register.component.html',
  styleUrls: ['./employer-register.component.css']
})
export class EmployerRegisterComponent implements OnInit {
    isSubmitted=false;
    form!:FormGroup;
    showOtpField = false
    remainingTime = 0
    formattedTime: string = '03:00'
    otpResendCount: number = 0
    showOTPResend: boolean = true

    constructor(
      @Inject(Router) private readonly router:Router,
      @Inject(HttpClient) private readonly http:HttpClient,
      @Inject(FormBuilder) private readonly formbuilder:FormBuilder
    ){}

    ngOnInit(): void {
      this.form  = this.formbuilder.group({
        name:['',[validateByTrimming(nameValidators)]],
        email:['',[validateByTrimming(emailValidators)]],
        password:['',[validateByTrimming(passwordValidators)]],
        repeatPassword:[''],
        otp:[{value:'',disabled:true},[validateByTrimming(otpValidators)]]
      },{validators:passwordMatchValidator})
    }


    startTimer():void{
      this.remainingTime = OTP_TIMER;
      const timer = setInterval(()=>{
        this.remainingTime--;
        if(this.remainingTime<=0){
          clearInterval(timer);
          console.log('otp expired');
        }
        this.formattedTime = formatTime(this.remainingTime);
      },1000);
    }

    resendOTP():void{
      if(this.otpResendCount<MAX_OTP_LIMIT){
        this.http.get('employer/resendOtp').subscribe({
          next:()=>{
            console.log('otp successfully send');
            void Swal.fire('Otp send','check your email fron OTP','success');
            this.startTimer;
            this.otpResendCount++;
          }
        })
      }else{
        void Swal.fire('oops','Maximum otp resend attempts reached','warning');
      }
    }


    get f():Record<string,AbstractControl>{
      return this.form.controls
    }


    onSubmit(){
      this.isSubmitted = true;
      if(!this.form.invalid && !this.showOtpField){
        const employer = this.form.getRawValue();
        this.http.post('employer/register',employer).subscribe({
          next:(res:any)=>{
            localStorage.setItem('employerAuthToken',res.token);
            this.showOtpField = true;
            this.form.get('name')?.disable();
            this.form.get('email')?.disable();
            this.form.get('password')?.disable();
            this.form.get('repeatPassword')?.disable();
            this.form.get('otp')?.enable();
            this.startTimer();
            setTimeout(()=>{
              this.showOTPResend = false;
            },OTP_RESEND_MAX_TIME)
          }
        })
      }else if(!this.form.invalid && this.showOtpField){
        const employer = this.form.getRawValue();
        console.log(employer);
        console.log(employer.otp);
        const authToken = localStorage.getItem('employerAuthtoken');
        const otp = employer.otp;
        this.http.post('employer/validateOtp',{otp,authToken}).subscribe({
          next:()=>{
            void this.router.navigate(['/employer/home']);
          }
        })

      }else{
        console.log('error',this.form.errors);
      }
    }
}
