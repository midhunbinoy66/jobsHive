import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { validateByTrimming } from 'src/app/helpers/validations';
import { IApiUserAuthRes } from 'src/app/models/users';
import { emailValidators, passwordValidators } from 'src/app/shared/validators';
import { saveUserOnStore } from 'src/app/states/user/user.action';
import { environment } from 'src/environments/environment'
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  isSubmitted = false;
  form!:FormGroup

  constructor(
    @Inject(Router) private readonly router:Router,
    @Inject(FormBuilder) private readonly formBuilder:FormBuilder,
    @Inject(HttpClient) private readonly http:HttpClient,
    @Inject(Store) private readonly store:Store
  ){}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email:['',[validateByTrimming(emailValidators)]],
      password:['',[validateByTrimming(passwordValidators)]]
    })
    

  }

  get f():Record<string,AbstractControl>{
    return this.form.controls
  }

  onSubmit():void{
    this.isSubmitted = true;
    if(!this.form.invalid){
      const user = this.form.getRawValue();
      console.log(user);
      this.http.post<IApiUserAuthRes>('user/login',user).subscribe({
        next:(res:IApiUserAuthRes)=>{
            if(res.data !== null){
              localStorage.setItem('userAccessToken',res.accessToken)
              localStorage.setItem('userRefreshToken',res.refreshToken)
              this.store.dispatch(saveUserOnStore({userDetails:res.data}));
              void this.router.navigate(['/']);
            }
        }
      })
    }
  }
}
