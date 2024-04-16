import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { validateByTrimming } from 'src/app/helpers/validations';
import { IJobAddress } from 'src/app/models/common';
import { IEmployerRes } from 'src/app/models/employer';
import { IJobReq } from 'src/app/models/jobs';
import { JobService } from 'src/app/services/job.service';
import { commonValidators, salaryValidators } from 'src/app/shared/validators';
import { selectEmployerDetails } from 'src/app/states/employer/employrer.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employer-create-job',
  templateUrl: './employer-create-job.component.html',
  styleUrls: ['./employer-create-job.component.css']
})
export class EmployerCreateJobComponent implements OnInit {

  jobForm!:FormGroup
  isSubmitted=false;
  employer$ = this.store.pipe(select(selectEmployerDetails));
  employer:IEmployerRes|null =null;
  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly store:Store,
    private readonly jobService:JobService,
    private readonly router:Router
  ){}


  ngOnInit(): void {

    this.employer$.subscribe((res)=>{
      this.employer = res;
    })

    this.jobForm = this.formBuilder.group({
      title:['',[validateByTrimming(commonValidators)]],
      description:['',[validateByTrimming(commonValidators)]],
      salary:['',[validateByTrimming(salaryValidators)]],
      city:['',[validateByTrimming(commonValidators)]],
      district:['',[validateByTrimming(commonValidators)]],
      state:['',[validateByTrimming(commonValidators)]],
      country:['',[validateByTrimming(commonValidators)]],
      landmark:['',[validateByTrimming(commonValidators)]],
      zip:['',[validateByTrimming(commonValidators)]],
      requierments:this.formBuilder.array([this.formBuilder.control('')]),
      responsibilities:this.formBuilder.array([this.formBuilder.control('')]),
      typeOfJob:['',[validateByTrimming(commonValidators)]]

    })
  }

  get requiermentForms(){
    return this.jobForm.get('requierments') as FormArray
  }

  removeRequierment(index:number){
    this.requiermentForms.removeAt(index);
  }

  addRequierment(){
    this.requiermentForms.push(this.formBuilder.control(''))
  }


  get responsibilitiesFrom(){
    return this.jobForm.get('responsibilities') as FormArray
  }

  addResponsiblilites(){
    this.responsibilitiesFrom.push(this.formBuilder.control(''));
  }

  removeResponsibilities(index:number){
    this.responsibilitiesFrom.removeAt(index);
  }

  onSubmit(){
    this.isSubmitted =true;
    if(!this.jobForm.invalid){
      console.log('submitted');
      const formData= this.jobForm.getRawValue();
      
      const jobAddress:IJobAddress  = {
        city:formData.city,
        district:formData.district,
        state:formData.state,
        country:formData.country,
        zip:formData.zip
      }
  
      const jobData:IJobReq ={
        title:formData.title,
        description:formData.description,
        location:jobAddress,
        requierments:formData.requierments,
        responsibilities:formData.responsibilities,
        salary:formData.salary,
        type:formData.typeOfJob,
        employer:this.employer!._id
      }
   
      console.log(jobData)
  
      this.jobService.createJob(jobData).subscribe({
        next:(res)=>{
          void Swal.fire('Success','Job Has been created','success');
          this.router.navigate(['/employer/jobs'])
        }
      })
    }

  }
}
