import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validateByTrimming } from 'src/app/helpers/validations';
import { IApiJobRes, IApiJobsRes, IJobRes } from 'src/app/models/jobs';
import { JobService } from 'src/app/services/job.service';
import { commonValidators, salaryValidators } from 'src/app/shared/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employer-job-edit',
  templateUrl: './employer-job-edit.component.html',
  styleUrls: ['./employer-job-edit.component.css']
})
export class EmployerJobEditComponent implements OnInit{

  jobForm!:FormGroup
  jobData:IJobRes | null = null;
  isSubmitted = false;

  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly jobService:JobService,
    private readonly route:ActivatedRoute,
    private readonly router:Router
  ){}

  ngOnInit(): void {
      this.route.params.subscribe(params=>{
        const jobId = params['jobId'];
        this.jobService.findJobById(jobId).subscribe({
          next:(res)=>{
            this.jobData = res.data
            if(this.jobData){
             this.intializeForm();
            }
          }
        })
      })

  }


  intializeForm(){
    this.jobForm = this.formBuilder.group({
      title:['',[validateByTrimming(commonValidators)]],
      description:['',[validateByTrimming(commonValidators)]],
      salary:['',Validators.required],
      city:['',[validateByTrimming(commonValidators)]],
      district:['',[validateByTrimming(commonValidators)]],
      state:['',[validateByTrimming(commonValidators)]],
      country:['',[validateByTrimming(commonValidators)]],
      // landmark:['',[validateByTrimming(commonValidators)]],
      zip:['',Validators.required],
      requierments:this.formBuilder.array([this.formBuilder.control('')]),
      responsibilities:this.formBuilder.array([this.formBuilder.control('')]),
      typeOfJob:['',Validators.required]
    })

    console.log(this.jobData);
    this.jobForm.patchValue({
      title:this.jobData!.title ||'',
      description:this.jobData!.description ||'',
      salary:this.jobData!.salary || '',
      typeOfJob:this.jobData!.type || ''
    })

    if(this.jobData?.location){
      this.jobForm.patchValue({
        city:this.jobData.location.city ||'',
        district:this.jobData.location.district || '',
        state:this.jobData.location.state || '',
        country:this.jobData.location.country || '',
        zip:this.jobData.location.zip
      })
    }

    if(this.jobData?.requierments && this.jobData.requierments.length>0){
      this.jobData.requierments.forEach((requirement)=>{
        this.requiermentForms.push(this.formBuilder.control(requirement));
      })
    }

    if(this.jobData?.responsibilities && this.jobData.responsibilities.length>0){
      this.jobData.responsibilities.forEach((responsibility)=>{
        this.responsibilitiesFrom.push(this.formBuilder.control(responsibility));
      })
    }
  }



  get requiermentForms(){
    return this.jobForm.get('requierments') as FormArray
  }

  addRequierment(){
    this.requiermentForms.push(this.formBuilder.control(''))
  }

  removeRequierment(index:number){
    this.requiermentForms.removeAt(index);
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
    this.isSubmitted = true;
    if(!this.jobForm.invalid){
      const formData = this.jobForm.getRawValue();
      this.jobService.updateJob(this.jobData!._id,formData).subscribe({
        next:(res)=>{
          void Swal.fire('Success','Job Edited Successfully','success');
          this.router.navigate(['/employer/jobs'])
        }
      })
    }
  }
}
