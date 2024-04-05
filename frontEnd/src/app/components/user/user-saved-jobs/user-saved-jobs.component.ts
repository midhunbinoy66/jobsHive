import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IJobRes } from 'src/app/models/jobs';
import { IUserRes } from 'src/app/models/users';
import { JobService } from 'src/app/services/job.service';
import { selectUserDetails } from 'src/app/states/user/user.selector';

@Component({
  selector: 'app-user-saved-jobs',
  templateUrl: './user-saved-jobs.component.html',
  styleUrls: ['./user-saved-jobs.component.css']
})
export class UserSavedJobsComponent implements OnInit{
    userDetails$ = this.store.pipe(select(selectUserDetails));
    user:IUserRes |null = null;
    savedJobs:IJobRes[]|null=[];
    constructor(
      private readonly store:Store,
      private readonly jobService:JobService
    ){}

    ngOnInit(): void {  
      this.userDetails$.subscribe((user)=>{
        this.user = user;
      })

      const savedJobsIds = this.user?.savedJobs;
      if(savedJobsIds !== undefined && savedJobsIds.length>0){
        this.jobService.findSavedJobs(savedJobsIds).subscribe({
          next:(res)=>{
            this.savedJobs = res.data
          }
        })
      }
    }
}
