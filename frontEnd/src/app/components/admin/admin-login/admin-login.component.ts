import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator, validateByTrimming } from 'src/app/helpers/validations';
import { IApiAdminAuthRes } from 'src/app/models/admin';
import { emailValidators, passwordValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  isSubmitted=false;
  form!:FormGroup
  constructor(
    @Inject(Router) readonly router:Router,
    @Inject(HttpClient) readonly http:HttpClient,
    @Inject(FormBuilder) readonly formBuilder:FormBuilder
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
    const admin = this.form.getRawValue();
    this.http.post<IApiAdminAuthRes>('admin/login',admin).subscribe({
      next:(res:IApiAdminAuthRes)=>{
        localStorage.setItem('adminAccessToken',res.accessToken);
        localStorage.setItem('adminRefreshToken',res.refreshToken)
        void this.router.navigate(['/admin/home'])
      }
    })
  }
}


}
