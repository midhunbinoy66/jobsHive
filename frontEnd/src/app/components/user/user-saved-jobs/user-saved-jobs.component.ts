import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs';
import { IJobRes } from 'src/app/models/jobs';
import { IUserRes } from 'src/app/models/users';
import { JobService } from 'src/app/services/job.service';
import { fetchUserData, saveUserOnStore } from 'src/app/states/user/user.action';
import { selectUserDetails } from 'src/app/states/user/user.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-saved-jobs',
  templateUrl: './user-saved-jobs.component.html',
  styleUrls: ['./user-saved-jobs.component.css']
})
export class UserSavedJobsComponent implements OnInit{

    pageNumber =1;
    pageSize = 3
    max=0;
    totalJobs =0
    savedJobIds!:string[]
    userDetails$ = this.store.pipe(select(selectUserDetails));
    user:IUserRes |null = null;
    savedJobs:IJobRes[]|null=[];
    constructor(
      private readonly store:Store,
      private readonly jobService:JobService,
      private readonly router:Router,
      private readonly cdr: ChangeDetectorRef
    ){}

    ngOnInit(): void {  
      this.userDetails$.subscribe((user)=>{
        if (user) {
          this.user = user;
          if(user.savedJobs)
          this.savedJobIds = user.savedJobs;
          if (this.savedJobIds && this.savedJobIds.length > 0) {
            this.getJobs(this.savedJobIds)
          }
        }
      })

    }

    getJobs(savedJobsIds:string[]){
      this.jobService.findSavedJobs(savedJobsIds,this.pageNumber,this.pageSize).subscribe({
        next: (res) => {
          if(res.data){
            this.savedJobs = res.data?.jobs;
            this.totalJobs = res.data.jobCount
            this.max = Math.ceil(this.totalJobs/this.pageSize)
          }
        }
      });
    }


    onPageChage(page:number){
      this.pageNumber = page;
      this.getJobs(this.savedJobIds)
    }

    onRemove(jobId:string){
      this.jobService.removeSavedJob(this.user!._id,jobId).subscribe({
        next:(res)=>{
          this.store.dispatch(fetchUserData({ userId: this.user!._id }))
          this.savedJobs =this.savedJobs!.filter(job=>job._id !== jobId)
          void Swal.fire('Success','Job has been removed','success')
        }
      })
    }
}
