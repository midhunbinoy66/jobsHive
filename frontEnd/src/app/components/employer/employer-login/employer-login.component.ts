import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { validateByTrimming } from 'src/app/helpers/validations';
import { emailValidators, passwordValidators } from 'src/app/shared/validators';
import { saveEmployerOnStore } from 'src/app/states/employer/employer.action';

@Component({
  selector: 'app-employer-login',
  templateUrl: './employer-login.component.html',
  styleUrls: ['./employer-login.component.css']
})
export class EmployerLoginComponent implements OnInit {
  isSubmitted = false;
  form!:FormGroup;

  constructor(
    @Inject(HttpClient) private readonly http:HttpClient,
    @Inject(Router) private readonly router:Router,
    @Inject(FormBuilder) private readonly formBuilder:FormBuilder,
    private readonly store:Store
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
    
    onSubmit(){
      this.isSubmitted = true;
      if(!this.form.invalid){
        const employer = this.form.getRawValue();
        this.http.post('employer/login',employer).subscribe({
          next:(res:any)=>{
            localStorage.setItem('employerAccessToken',res.accessToken);
            localStorage.setItem('employerRefreshToken',res.refreshToken);
            this.store.dispatch(saveEmployerOnStore({employerDetails:res.data}));
            void this.router.navigate(['/employer/home']);
          }
        })
      }
    }
}
