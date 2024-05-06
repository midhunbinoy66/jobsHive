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
  pageNumber = 1;
  totalItems: number = 0;
  itemsPerPage: number = 3;
  max =0;

  
  jobsForVerification :IJobRes[] | null =[]
  constructor(
    private readonly jobService:JobService,
    private dialog:MatDialog
  ){}

  ngOnInit(): void {
    this.loadJobsForVerification();
  }

  loadJobsForVerification(): void {
    this.jobService.findJobsForVerification(this.pageNumber, this.itemsPerPage).subscribe({
      next: (res) => {
      this.jobsForVerification = res.data!.jobs;
      console.log(res.data);
        this.totalItems = res.data!.jobCount;  // Total number of items from the API
        console.log(this.totalItems);
        console.log(this.jobsForVerification);
        this.max = Math.ceil(this.totalItems/this.itemsPerPage);
      }
    });
  }

  pageChanged(page: number): void {
    this.pageNumber =page
    this.loadJobsForVerification();
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
            this.loadJobsForVerification(); 
          }
        })
      }
  })

  }

}
