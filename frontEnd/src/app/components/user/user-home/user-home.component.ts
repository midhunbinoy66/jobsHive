import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IApiJobsRes } from 'src/app/models/jobs';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  searchForm!:FormGroup;
  jobs!:any[]|null;

  constructor(
    private jobService:JobService,
    private formBuilder:FormBuilder
  ){}

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      title:['',Validators.required],
      location:['',Validators.required]
    })
  }

  onSubmit(){
    let criteria = this.searchForm.getRawValue();
    this.jobService.findJobs(criteria).subscribe({
      next:(res:IApiJobsRes)=>{ 
          this.jobs = res.data;
          console.log(this.jobs);
      }
    })
  }


}
