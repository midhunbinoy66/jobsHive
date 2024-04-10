import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { IEmployerRes } from 'src/app/models/employer';
import { IJobRes } from 'src/app/models/jobs';
import { JobService } from 'src/app/services/job.service';
import { selectEmployerDetails } from 'src/app/states/employer/employrer.selector';
import { JobDeleteModalComponent } from '../../common/job-delete-modal/job-delete-modal.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-jobs',
  templateUrl: './employer-jobs.component.html',
  styleUrls: ['./employer-jobs.component.css']
})
export class EmployerJobsComponent implements OnInit{

  employerDetails = this.store.pipe(select(selectEmployerDetails))
  employer:IEmployerRes| null = null;
  employerJobs:IJobRes[]|null = null;
  isDeleted = false;

  constructor(
    private readonly store:Store,
    private readonly jobService:JobService,
    private readonly dialog:MatDialog,
    private readonly router:Router
  ){}

  ngOnInit(): void {
    this.employerDetails.subscribe((res)=>{
      this.employer = res;
    })
    if(this.employer){
      this.jobService.findEmployerJobs(this.employer._id).subscribe({
        next:(res)=>{
          this.employerJobs = res.data
        }
      })
    }
  }

  onDeleteJob(jobId:string){
    const dialogRef = this.dialog.open(JobDeleteModalComponent,{
      data:{
        jobId:jobId
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.jobService.deleteEmployerJob(jobId).subscribe({
          next:(res)=>{
            void Swal.fire('Success','Job Deleted Successfully','success');
            this.isDeleted = true;
          }
        })
      }
    })

  }


  onEditJob(jobId:string){
    this.router.navigate([`/employer/edit-job/${jobId}`])
  }

  viewJob(jobId:string){
    this.router.navigate([`/employer/job/${jobId}`]);
  }



}
