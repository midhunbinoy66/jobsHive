import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IApiApplicationRes, IApiApplicationsRes, IApplicationRes } from 'src/app/models/application';
import { IUserRes } from 'src/app/models/users';
import { JobService } from 'src/app/services/job.service';
import { selectUserDetails } from 'src/app/states/user/user.selector';

@Component({
  selector: 'app-user-applied-jobs',
  templateUrl: './user-applied-jobs.component.html',
  styleUrls: ['./user-applied-jobs.component.css']
})
export class UserAppliedJobsComponent implements OnInit {

  pageNumber =1
  pageSize = 3
  max = 0;
  totalApplications = 0;
  userDetails$ = this.store.pipe(select(selectUserDetails));
  user:IUserRes| null = null;
  userApplication:IApplicationRes[]|null =null;
  constructor(
    private readonly store:Store,
    private readonly router:Router,
    private readonly jobService:JobService
  ){}

  ngOnInit(): void {
    this.userDetails$.subscribe((res)=>{
      this.user =res
    });
    this.getAppliedJobs();
  }

  getAppliedJobs(){
    this.jobService.findAppliedJobs(this.user!._id,this.pageNumber,this.pageSize).subscribe({
      next:(res)=>{
        this.userApplication =res.data.applications
        console.log(this.userApplication);
        this.totalApplications = res.data.applicationsCount
        this.max = Math.ceil(this.totalApplications/this.pageSize)
      }
    })
  }

  onPageChange(pageNumber:number):void{
    this.pageNumber = pageNumber;
    this.getAppliedJobs()
  }
}
