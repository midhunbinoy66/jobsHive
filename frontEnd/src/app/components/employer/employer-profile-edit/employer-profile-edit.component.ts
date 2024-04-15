import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { validateByTrimming } from 'src/app/helpers/validations';
import { IEmployerAddress } from 'src/app/models/common';
import { IEmployerRes, IEmployerUpdate } from 'src/app/models/employer';
import { IUserUpdate } from 'src/app/models/users';
import { EmployerService } from 'src/app/services/employer.service';
import { mobileValidators, nameValidators, requiredValidator } from 'src/app/shared/validators';
import { saveEmployerOnStore } from 'src/app/states/employer/employer.action';
import { selectEmployerDetails } from 'src/app/states/employer/employrer.selector';

@Component({
  selector: 'app-employer-profile-edit',
  templateUrl: './employer-profile-edit.component.html',
  styleUrls: ['./employer-profile-edit.component.css']
})
export class EmployerProfileEditComponent implements OnInit {
  profileForm!:FormGroup;
  user:IEmployerRes|null = null;
  employerId = '';
  isSubmitted=false;
  city=''
  district=''
  state=''
  country=''
  zip=''
  dpurl = ''
  employeDetails$ = this.store.pipe(select(selectEmployerDetails));


  constructor(
    private readonly store:Store,
    private readonly employerService:EmployerService,
    private readonly formBuilder:FormBuilder,
    private readonly router:Router
  ){}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name:['',validateByTrimming(nameValidators)],
      mobile:['',validateByTrimming(mobileValidators)],
      city:['',validateByTrimming(requiredValidator)],
      district:['',validateByTrimming(requiredValidator)],
      state:['',[validateByTrimming(requiredValidator)]],
      country:['',[validateByTrimming(requiredValidator)]],
      zip:['',[validateByTrimming(requiredValidator)]]
    })

    this.employeDetails$.subscribe(user=>{
      this.user = user ?? this.user
      if(this.user !== null && this.user !== undefined){
        this.employerId = this.user._id;
        this.profileForm.get('name')?.setValue(this.user.name);
        this.profileForm.get('mobile')?.setValue(this.user.mobile);
        if(this.user.profilePic !== undefined) this.dpurl = 'http://localhost:3000'+`'/images/${this.user.profilePic}`
        console.log(this.user);
        if(this.user.address !== null){
          this.city = String(this.user.address?.city)
          this.district = String(this.user.address?.district)
          this.state = String(this.user.address?.state)
          this.country = String(this.user.address?.country)
          this.zip = String(this.user.address?.zip)
        }
      }
    })

  }

  onsubmit():void{
    this.isSubmitted = true;
    console.log(this.profileForm.getRawValue());
    if(this.profileForm.valid){
      const userData = this.profileForm.getRawValue();
      const address :IEmployerAddress ={
        city:userData.city,
        district:userData.district,
        state:userData.state,
        country:userData.country,
        zip:userData.zip
      }

      const user: IEmployerUpdate={
        name:userData.name,
        mobile:userData.mobile,
        address
      }

      this.employerService.updateUserDetails(this.employerId,user).subscribe({
        next:(res)=>{
          void this.router.navigate(['/employer/profile'])
          if(res.data != null) this.store.dispatch(saveEmployerOnStore({employerDetails:res.data}));
        }
      })
    }
  }
}
