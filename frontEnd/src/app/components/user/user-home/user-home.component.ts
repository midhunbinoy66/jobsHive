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
import { EmployerService } from 'src/app/services/employer.service';

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
  employerName!:string;
  userId='';
  user:IUserRes|null=null;
  userDetail$ = this.store.pipe(select(selectUserDetails));
  isSearched=false;
  sort!:string
  salarySort:string ='Sort Salary'
  jobTypeSort:string='Job Type'
  filteredResults!:IJobRes[]|null
  constructor(
    private jobService:JobService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private store:Store,
    private router:Router,
    private dialog:MatDialog,
    private readonly employerService:EmployerService
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
          this.filteredResults = [...this.searchResults]
          this.selectedJob = this.searchResults![0]
          if(this.selectedJob){
            this.employerService.getEmployerData(this.selectedJob!.employer).subscribe({
              next:(res)=>{
                this.employerName = res.data.name
              }
            })
          }

          this.totalJobs = res.data.jobCount
          this.max = Math.ceil(this.totalJobs/this.pageSize);
        }
      }
    })
  }


  onSelection(jobId:string){
    this.selectedJob = this.searchResults?.find(j=>j._id==jobId);
    if(this.selectedJob){
      this.employerService.getEmployerData(this.selectedJob!.employer).subscribe({
        next:(res)=>{
          this.employerName = res.data.name
        }
      })
    }

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
          jobLocation:jobLocation.city+","+jobLocation.state,
          coverLetter:result.coverLetter,
          resume:''
        }
        const formData = new FormData();
        formData.append('file',result.file,this.user?.name+'.pdf');
        if(this.user?._id)
        this.userService.uploadUserResume(this.user?._id,formData).subscribe((res)=>{
          console.log('uploading resume')
          console.log(res);
          if(res.data.resume)
          jobData.resume = res.data.resume
          console.log(jobData);
          console.log(res.data.resume);
          this.jobService.applyForJob(jobData).subscribe({
            next:(res)=>{
              console.log(res);
              void Swal.fire('Success','You application has been sent','success');
            }
          })
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

  onDateSort(){
    console.log(this.sort);
    if(this.sort === 'thisWeek'){
      let today = new Date()
      let lastWeek = new Date(today.getTime()- 7*24*60*60*1000);
      this.searchResults = this.searchResults!.filter(job=>{
        let jobDate = new Date(job.dateCreated);
        return jobDate >= lastWeek
      })
      this.selectedJob = this.searchResults[0];
    }
  }

  onSalarySort(){
    console.log(this.salarySort);
    if(this.salarySort==='highToLow'){
      this.filteredResults = this.searchResults!.sort((a,b)=>b.salary-a.salary);
      this.selectedJob = this.filteredResults[0];
    }else if(this.salarySort === 'lowToHigh'){
      this.filteredResults = this.searchResults!.sort((a,b)=>a.salary-b.salary);
      this.selectedJob = this.filteredResults[0]
    }else{
      this.filteredResults = this.searchResults
    }
  }

  onJobTypeSort(){
    console.log(this.jobTypeSort);
    if(this.searchResults !== null){
      const filteredResults = [...this.searchResults];
      if(this.jobTypeSort==='fullTime'){
        this.filteredResults = this.searchResults!.filter(job=>job.type==='fullTime');
        this.selectedJob = this.searchResults[0];
      }else if(this.jobTypeSort === 'partTime'){
        console.log(this.searchResults);
        this.filteredResults = this.searchResults!.filter(job=>job.type==='partTime');
        this.selectedJob = this.searchResults[0]
      }else{
        this.filteredResults = [...this.searchResults]
      }
    }

  }
}
