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

    this.jobService.findAppliedJobs(this.user!._id).subscribe({
      next:(res)=>{
        this.userApplication =res.data
      }
    })


  }
}
