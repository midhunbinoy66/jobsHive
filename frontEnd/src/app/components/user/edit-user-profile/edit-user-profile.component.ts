import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { validateByTrimming } from 'src/app/helpers/validations';
import { IUserAddress } from 'src/app/models/common';
import { IUserRes, IUserUpdate } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';
import { mobileValidators, nameValidators, requiredValidator } from 'src/app/shared/validators';
import { saveUserOnStore } from 'src/app/states/user/user.action';
import { selectUserDetails } from 'src/app/states/user/user.selector';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {
  profileForm!:FormGroup;
  user:IUserRes|null = null;
  userId = '';
  isSubmitted=false;
  city=''
  district=''
  state=''
  country=''
  zip=''
  dpurl = ''
  userDetails$ = this.store.pipe(select(selectUserDetails));
  selectedFile!: File
  

  constructor(
    private readonly store:Store,
    private readonly userService:UserService,
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

    this.userDetails$.subscribe(user=>{
      this.user = user ?? this.user
      if(this.user !== null && this.user !== undefined){
        this.userId = this.user._id;
        this.profileForm.get('name')?.setValue(this.user.name);
        this.profileForm.get('mobile')?.setValue(this.user.mobile);
        if(this.user.profilePic !== undefined) this.dpurl = 'http://localhost:3000'+`/images/${this.user.profilePic}`
        console.log(this.dpurl);
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
    if(this.profileForm.valid){
      const userData = this.profileForm.getRawValue();
      const address :IUserAddress ={
        city:userData.city,
        district:userData.district,
        state:userData.state,
        country:userData.country,
        zip:userData.zip
      }

      const user: IUserUpdate={
        name:userData.name,
        mobile:userData.mobile,
        address
      }

      this.userService.updateUserDetails(this.userId,user).subscribe({
        next:(res)=>{
          void this.router.navigate(['/user/profile'])
          if(res.data != null) this.store.dispatch(saveUserOnStore({userDetails:res.data}));
        }
      })
    }
  }

  imageReady (blob:Blob):void{
    const formData = new FormData();
    formData.append('image',blob,this.user?.name+'.jpg');
    this.userService.updateUserProfilePhoto(this.userId,formData).subscribe({
      next:(res)=>{
        if(res.data !== null){
          this.dpurl = environment.baseUrl+`/images/${res.data.profilePic}`
          this.store.dispatch(saveUserOnStore({userDetails:res.data}))
        }
      },
      error:()=>{
        this.dpurl = ''
      }
    })
  }

  deleteProfilePic(): void{
    this.userService.deleteUserProfile(this.userId).subscribe({
      next:(res)=>{
        this.dpurl =''
        if(res.data !== null) this.store.dispatch(saveUserOnStore({userDetails:res.data}));
      }
    })
  }

}
