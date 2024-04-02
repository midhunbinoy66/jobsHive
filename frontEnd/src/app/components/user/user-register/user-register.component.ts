import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { formatTime } from 'src/app/helpers/timer';
import { passwordMatchValidator, validateByTrimming } from 'src/app/helpers/validations';
import { IApiUserAuthRes, IUserRes, IUserSocialAuth } from 'src/app/models/users';
import { MAX_OTP_LIMIT, OTP_RESEND_MAX_TIME, OTP_TIMER } from 'src/app/shared/constants';
import { emailValidators, nameValidators, otpValidators, passwordValidators } from 'src/app/shared/validators';
import { saveUserOnStore } from 'src/app/states/user/user.action';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  form!:FormGroup ;
  isSubmitted=false;
  showOtpField = false;
  remainingTime =0;
  formattedTime: string = '03:00'
  otpResendCount: number = 0
  showOTPResend: boolean = true
  loggedIn!: boolean;
  constructor(
      @Inject(HttpClient) private readonly http:HttpClient,
      @Inject(Router) private readonly router:Router,
      @Inject(FormBuilder) private readonly formBuilder:FormBuilder,
      @Inject(Store) private readonly store:Store,
      @Inject(Store) private readonly authService:SocialAuthService
  ){}


    ngOnInit(): void {
      this.form = this.formBuilder.group({
        name:['',[validateByTrimming(nameValidators)]],
        email:['',[validateByTrimming(emailValidators)]],
        password:['',[validateByTrimming(passwordValidators)]],
        repeatPassword:[''],
        otp: [{ value: '', disabled: true }, [validateByTrimming(otpValidators)]]
      }, {
        validators: passwordMatchValidator
      })

    //   this.authService.authState.subscribe((user)=>{
    //   const userData:IUserSocialAuth ={
    //     name:user.name,
    //     email:user.email,
    //     profilePic:user.photoUrl
    //   }
    //   console.log(user);
    //   this.http.post<IApiUserAuthRes>('user/auth/google', userData).subscribe({
    //     next: (res: IApiUserAuthRes) => {
    //       localStorage.setItem('userAccessToken', res.accessToken)
    //       localStorage.setItem('userRefreshToken', res.refreshToken)
    //       this.store.dispatch(saveUserOnStore({ userDetails: res.data as IUserRes }))
    //       void this.router.navigate(['/'])
    //     }
    //   })

    // })    

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
        console.log(this.form.invalid, this.form.get('repeatPassword'),this.form.get('password'), this.form.get('name'),this.form.get('email'))
        if(!this.showOtpField && !this.form.invalid){
          const user = this.form.getRawValue();
          console.log(user);
          this.http.post('user/register',user).subscribe({
            next:(res:any)=>{
              localStorage.setItem('userAuthToken', res.token)
              this.showOtpField  =true;
              this.form.get('name')?.disable();
              this.form.get('email')?.disable();
              this.form.get('password')?.disable();
              this.form.get('repeatPassword')?.disable();
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
