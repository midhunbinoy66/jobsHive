import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IApiApplicationsRes, IApplicationRes } from 'src/app/models/application';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-employer-job-applicants',
  templateUrl: './employer-job-applicants.component.html',
  styleUrls: ['./employer-job-applicants.component.css']
})
export class EmployerJobApplicantsComponent implements OnInit{
  
  applications:IApplicationRes[] |null = null

  constructor(
    private readonly router:Router,
    private readonly route:ActivatedRoute,
    private readonly applicationService:ApplicationService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const jobId = params['jobId'];
      this.applicationService.findApplicationByJobId(jobId).subscribe({
        next:(res)=>{
          this.applications = res.data
        }
      })
    })
  }
}
