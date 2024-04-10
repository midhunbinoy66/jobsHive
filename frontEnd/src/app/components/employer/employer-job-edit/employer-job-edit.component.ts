import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { validateByTrimming } from 'src/app/helpers/validations';
import { IApiJobRes, IApiJobsRes, IJobRes } from 'src/app/models/jobs';
import { JobService } from 'src/app/services/job.service';
import { commonValidators, salaryValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-employer-job-edit',
  templateUrl: './employer-job-edit.component.html',
  styleUrls: ['./employer-job-edit.component.css']
})
export class EmployerJobEditComponent implements OnInit{

  jobForm!:FormGroup
  jobData:IJobRes | null = null;

  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly jobService:JobService,
    private readonly route:ActivatedRoute
  ){}

  ngOnInit(): void {
      this.route.params.subscribe(params=>{
        const jobId = params['jobId'];
        this.jobService.findJobById(jobId).subscribe({
          next:(res)=>{
            this.jobData = res.data
            if(this.jobData){


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

    console.log(this.jobData);
    this.jobForm.patchValue({
      title:this.jobData.title ||'',
      description:this.jobData.description ||'',
      salary:this.jobData.salary || '',
      typeOfJob:this.jobData.type || ''
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

    if(this.jobData?.requirements && this.jobData.requirements.length>0){
      this.jobData.requirements.forEach((requirement)=>{
        this.requiermentForms.push(this.formBuilder.control(requirement));
      })
    }

    if(this.jobData?.responsibilities && this.jobData.responsibilities.length>0){
      this.jobData.responsibilities.forEach((responsibility)=>{
        this.requiermentForms.push(this.formBuilder.control(responsibility));
      })
    }

  
            }
          }
        })
      })

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
    console.log(this.jobForm.getRawValue())
  }
}
