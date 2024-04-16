import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IApiApplicationsRes, IApplicationRes } from 'src/app/models/application';
import { IUserRes } from 'src/app/models/users';
import { ApplicationService } from 'src/app/services/application.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateJobStatusModalComponent } from '../../common/update-job-status-modal/update-job-status-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employer-job-applicants',
  templateUrl: './employer-job-applicants.component.html',
  styleUrls: ['./employer-job-applicants.component.css']
})
export class EmployerJobApplicantsComponent implements OnInit{
  
  applications:IApplicationRes[] |null = null
  user:IUserRes | null = null;
  jobId:string ='';

  constructor(
    private readonly router:Router,
    private readonly route:ActivatedRoute,
    private readonly applicationService:ApplicationService,
    private readonly userService:UserService,
    private dialog:MatDialog
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.jobId = params['jobId'];
      this.initialize();
    })
  }

  initialize(){
    this.applicationService.findApplicationByJobId(this.jobId).subscribe({
      next:(res)=>{
        this.applications = res.data
        console.log(this.applications);
      }
    })
  }

  viewResume(userId:string){
    this.router.navigate([`/employer/job/resume/${userId}`])
  }

  updateJobStatus(userId:string,applicationId:string){
    this.userService.getUserDetails(userId).subscribe({
      next:(res)=>{
        this.user = res.data;
      }
    })

    const userData = {
      name:this.user?.name,
      emal:this.user?.email,
      jobId:this.jobId,
    }

    const dialogRef = this.dialog.open(UpdateJobStatusModalComponent,{
      data:userData
    })

    dialogRef.afterClosed().subscribe(result=>{
        if(result !== undefined){
          const status  ={status:result};
          this.applicationService.updateApplication(applicationId,status).subscribe({
            next:(res)=>{
              this.initialize();
              void Swal.fire('Success','Job Status updated','success');
            }
          })
        }
    })

  }
}
