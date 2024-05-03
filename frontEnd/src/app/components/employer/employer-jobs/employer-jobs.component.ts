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
  currentPage= 1
  totalItems =0
  pageSize =3
  Max = 0
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
      this.initialize();
    }
  }

  initialize(){
    this.jobService.findEmployerJobs(this.employer!._id,this.currentPage,this.pageSize).subscribe({
      next:(res)=>{
        console.log(res.data?.jobs);
        this.employerJobs = res.data!.jobs
        this.totalItems = res.data!.jobCount
        this.Max =Math.ceil(this.totalItems/this.pageSize);
      }
    })
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
            this.initialize();
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


  onPageChange(page:number){
    this.currentPage  =page;
    this.initialize();
  }


}
