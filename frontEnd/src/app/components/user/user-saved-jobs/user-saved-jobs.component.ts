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
          const savedJobsIds = user.savedJobs;
          if (savedJobsIds && savedJobsIds.length > 0) {
            this.jobService.findSavedJobs(savedJobsIds).subscribe({
              next: (res) => {
                this.savedJobs = res.data;
              }
            });
          }
        }
      })

      // const savedJobsIds = this.user?.savedJobs;
      // if(savedJobsIds !== undefined && savedJobsIds.length>0){
      //   this.jobService.findSavedJobs(savedJobsIds).subscribe({
      //     next:(res)=>{
      //       this.savedJobs = res.data
      //     }
      //   })
      // }
    }

    onRemove(jobId:string){
      this.jobService.removeSavedJob(this.user!._id,jobId).subscribe({
        next:(res)=>{
  
          this.store.dispatch(fetchUserData({ userId: this.user!._id }))
          void Swal.fire('Success','Job has been removed','success')
          this.router.navigate(['/user/jobs']);

        }
      })
    }
}
