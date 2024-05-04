import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IApiJobsAndCountRes, IApiJobsRes, IJobRes } from 'src/app/models/jobs';
import { IUserRes } from 'src/app/models/users';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';
import { saveUserOnStore } from 'src/app/states/user/user.action';
import { selectUserDetails } from 'src/app/states/user/user.selector';
import Swal from 'sweetalert2';
import { ApplyModalComponent } from '../../common/apply-modal/apply-modal.component';
import { IJobAddress } from 'src/app/models/common';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  pageNumber =1;
  pageSize =4
  max =0
  totalJobs = 0;
  searchForm!:FormGroup;
  searchResults!:IJobRes[]|null;
  selectedJob!:IJobRes| undefined;
  userId='';
  user:IUserRes|null=null;
  userDetail$ = this.store.pipe(select(selectUserDetails));
  isSearched=false;
  constructor(
    private jobService:JobService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private store:Store,
    private router:Router,
    private dialog:MatDialog
  ){}

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      title:['',Validators.required],
      location:['',Validators.required]
    })
    
    this.userDetail$.subscribe((user)=>{
      this.user  =user;
    })
  }

  onSubmit(){
    this.isSearched=true;
    let criteria = this.searchForm.getRawValue();
    this.jobService.findJobs(criteria,this.pageNumber,this.pageSize).subscribe({
      next:(res:IApiJobsAndCountRes)=>{ 
        if(res.data){
          this.searchResults = res.data.jobs;
          this.selectedJob = this.searchResults![0]
          this.totalJobs = res.data.jobCount
          this.max = Math.ceil(this.totalJobs/this.pageSize);
        }
      }
    })
  }


  onSelection(jobId:string){
    this.selectedJob = this.searchResults?.find(j=>j._id==jobId);
  }

  saveJob(jobId:string){
    if(this.user !== null){
      this.userService.saveUserJob(this.user._id,jobId).subscribe({
        next:(res)=>{
          void Swal.fire('Success','Job has been saved','success');
          this.store.dispatch(saveUserOnStore({userDetails:res.data}))
        }
      })
    }else{
      void Swal.fire({
        title: 'You are not logged in',
        text: 'Do you want to redirect to login page',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then(result => {
        if (result.isConfirmed) {
          void this.router.navigate(['/user/login'])
        }
      })
    }

  }

  onApply(jobId:string,jobTitle:string,jobLocation:IJobAddress){
    const dialogRef = this.dialog.open(ApplyModalComponent);
    dialogRef.afterClosed().subscribe(result=>{
      if(result !== undefined){
        const jobData ={
          userId: this.user?._id,
          jobId:jobId,
          jobTitle:jobTitle,
          jobLocation:jobLocation,
          coverLetter:result
        }
        console.log(jobData);
        this.jobService.applyForJob(jobData).subscribe({
          next:(res)=>{
            console.log(res);
            void Swal.fire('Success','You application has been sent','success');
          }
        })
      }else {
        console.log('Application canceled');
      }
    })
  }


  onFollow(employerId:string){
    this.userService.followEmployer(this.user!._id,employerId).subscribe({
      next:(res)=>{
        // this.user?.following?.push(employerId);
        this.store.dispatch(saveUserOnStore({userDetails:res.data}))
        void Swal.fire('Success','Followed','success');
      }
    })
  }


  onUnFollow(employerId:string){
    this.userService.unfollowEmployer(this.user!._id,employerId).subscribe({
      next:(res)=>{
        // if(this.user?.following)
        // this.user!.following = this.user!.following.filter(id => id !== employerId);
        this.store.dispatch(saveUserOnStore({userDetails:res.data}))
        void Swal.fire('Success','UnFollowed','success');
      }
    })
  }

  isFollowing(employerId: string): boolean {
    if(this.user?.following !==undefined){
      return this.user!.following.includes(employerId);
    }else return false

  }


  onPageChage(pageNumber:number){
    this.pageNumber = pageNumber;
    this.onSubmit()
  }
}
