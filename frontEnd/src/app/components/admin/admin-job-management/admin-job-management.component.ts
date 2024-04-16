import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IJobRes } from 'src/app/models/jobs';
import { JobService } from 'src/app/services/job.service';
import { JobVerifyModalComponent } from '../../common/job-verify-modal/job-verify-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-job-management',
  templateUrl: './admin-job-management.component.html',
  styleUrls: ['./admin-job-management.component.css']
})
export class AdminJobManagementComponent implements OnInit{

  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  
  jobsForVerification :IJobRes[] | null =[]
  constructor(
    private readonly jobService:JobService,
    private dialog:MatDialog
  ){}

  ngOnInit(): void {
    // this.jobService.findJobsForVerification().subscribe({
    //   next:(res)=>{
    //     this.jobsForVerification = res.data
    //     console.log(this.jobsForVerification);
    //   }
    // })
    this.loadJobsForVerification();
  }

  loadJobsForVerification(page: number = 1): void {
    this.jobService.findJobsForVerification(page, this.itemsPerPage).subscribe({
      next: (res) => {
      this.jobsForVerification = res.data!.jobs;
        this.totalItems = res.data!.jobsCount;  // Total number of items from the API
        console.log(this.jobsForVerification);
      }
    });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.loadJobsForVerification(this.currentPage);
  }

  updateJobstatus(jobId:string){
    const selectedJob = this.jobsForVerification?.filter(job=>jobId===job._id);
    const dialogRef = this.dialog.open(JobVerifyModalComponent,{
      data:selectedJob
    })

    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
      if(result){
        this.jobService.verifyJob(jobId).subscribe({
          next:(res)=>{
            void Swal.fire('Success','Job Status updated','success');
            this.loadJobsForVerification(this.currentPage); 
          }
        })
      }
  })

  }

}
