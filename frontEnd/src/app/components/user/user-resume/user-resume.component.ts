import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { validateByTrimming } from 'src/app/helpers/validations';
import { IUserEducation, IUserWorkExp } from 'src/app/models/common';
import { IResumeRes, IResumeUpdate } from 'src/app/models/resume';
import { IUserRes } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';
import { commonValidators, emailValidators, mobileValidators, nameValidators } from 'src/app/shared/validators';
import { selectUserDetails } from 'src/app/states/user/user.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-resume',
  templateUrl: './user-resume.component.html',
  styleUrls: ['./user-resume.component.css']
})
export class UserResumeComponent implements OnInit{

  userDetails$ = this.store.pipe(select(selectUserDetails));
  form!:FormGroup
  user:IUserRes|null=null;
  userResume:IResumeRes | null = null;
  isResume = false;
  userResumeData:IResumeUpdate |null = null;
  isSubmitted=false

  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly store:Store,
    private readonly useService:UserService,
    private readonly router:Router

  ){}

  ngOnInit(): void {
    this.userDetails$.subscribe((res)=>{
      this.user = res;
    })

    this.initializeForm();
    this.useService.getUserResumeDetails(this.user!._id).subscribe({
      next:(res)=>{
        this.userResume = res.data;
        if(this.userResume !== null){
          this.isResume = true;
          this.initializeForm();
        }

      }
    })

    // this.form = this.formBuilder.group({
    //   name:['',[validateByTrimming(nameValidators)]],
    //   email:['',[validateByTrimming(emailValidators)]],
    //   mobile:['',[validateByTrimming(mobileValidators)]],
    //   languages:this.formBuilder.array([this.formBuilder.control('')]),
    //   skills:this.formBuilder.array([this.formBuilder.control('')]),
    //   companyName:['',[validateByTrimming(commonValidators)]],
    //   jobTitle:['',[validateByTrimming(commonValidators)]],
    //   companyLocation:['',[validateByTrimming(commonValidators)]],
    //   companyStartDate:['',Validators.required],
    //   companyEndDate:['',Validators.required],
    //   institution:['',[validateByTrimming(commonValidators)]],
    //   degree:['',[validateByTrimming(commonValidators)]],
    //   fieldOfStudy:['',[validateByTrimming(commonValidators)]],
    //   startDate:['',Validators.required],
    //   endDate:['',Validators.required]

    // })

  }


  addLanguage() {
    this.languageForms.push(this.formBuilder.control(''));
  }


  get languageForms() {
    return this.form.get('languages') as FormArray;
  }

  removeLanguage(index: number) {
    this.languageForms.removeAt(index);
  }

  get skillForms(){
    return this.form.get('skills') as FormArray
  }

  addSkillForm(){
    this.skillForms.push(this.formBuilder.control(''))
  }

  removeSkill(index:number){
    this.skillForms.removeAt(index);
  }





  initializeForm(): void {
    // Initialize form controls and populate with user resume data
    this.form = this.formBuilder.group({
      name:['',[validateByTrimming(nameValidators)]],
      email:['',[validateByTrimming(emailValidators)]],
      mobile:['',[validateByTrimming(mobileValidators)]],
      languages:this.formBuilder.array([this.formBuilder.control('')]),
      skills:this.formBuilder.array([this.formBuilder.control('')]),
      companyName:['',[validateByTrimming(commonValidators)]],
      jobTitle:['',[validateByTrimming(commonValidators)]],
      companyLocation:['',[validateByTrimming(commonValidators)]],
      companyStartDate:['',Validators.required],
      companyEndDate:['',Validators.required],
      institution:['',[validateByTrimming(commonValidators)]],
      degree:['',[validateByTrimming(commonValidators)]],
      fieldOfStudy:['',[validateByTrimming(commonValidators)]],
      startDate:['',Validators.required],
      endDate:['',Validators.required]

    })

   
    if (this.userResume) {

      this.form.patchValue({
        name: this.userResume.name || '', 
        email: this.userResume.email || '', 
        mobile: this.userResume.mobile || '' 
      });
  
      // Patch values for arrays (e.g., languages and skills)
      if (this.userResume.languages && this.userResume.languages.length > 0) {
        this.userResume.languages.forEach((language: string) => {
          this.languageForms.push(this.formBuilder.control(language));
        });
      }
  
      if (this.userResume.skills && this.userResume.skills.length > 0) {
        this.userResume.skills.forEach((skill: string) => {
          this.skillForms.push(this.formBuilder.control(skill));
        });
      }
  
      if (this.userResume.workExperience) {
        this.form.patchValue({
          companyName: this.userResume.workExperience.companyName || '',
          jobTitle: this.userResume.workExperience.jobTitle || '',
          companyLocation: this.userResume.workExperience.location || '',
          companyStartDate:this.userResume.workExperience.workStartDate|| '',
          companyEndDate:this.userResume.workExperience.workEndDate|| '',


        });
      }
  
      if (this.userResume.education) {
        this.form.patchValue({
          institution: this.userResume.education.institution || '',
          degree: this.userResume.education.degree || '',
          fieldOfStudy:this.userResume.education.fieldOfStudy || '',
          startDate:this.userResume.education.eduStartDate || '',
          endDate:this.userResume.education.eduEndDate || ''
        });
      }


    }
  }





  onSubmit(){
    this.isSubmitted =true
    if(!this.form.invalid){
      const formData = this.form.getRawValue();
      const workData:IUserWorkExp = {
        companyName:formData.companyName,
        jobTitle:formData.jobTitle,
        location:formData.workStartDate,
        workStartDate:formData.companyStartDate,
        workEndDate:formData.companyEndDate
      }
  
      const educationData:IUserEducation={
        institution:formData.institution,
        degree:formData.degree,
        fieldOfStudy:formData.fieldOfStudy,
        eduEndDate:formData.endDate,
        eduStartDate:formData.startDate
      }
      this.userResumeData ={
        name:formData.name,
        email:formData.email,
        mobile:formData.mobile,
        languages:formData.languages,
        skills:formData.skills,
        workExperience:workData,
        education:educationData,
  
      }
      this.useService.saveUserResumeDetails(this.user!._id , this.userResumeData).subscribe({
        next:(res)=>{
          this.isResume =true;
          void Swal.fire('Success','Resume has been saved','success')
          this.router.navigate(['/user/resume'])
        }
      })
    }
    
  }
}
