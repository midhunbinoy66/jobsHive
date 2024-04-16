import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiJobRes, IApiJobsRes, IJobReq, IJobRes, IJobssAndCount } from '../models/jobs';
import { IApiApplicationRes, IApiApplicationsRes } from '../models/application';
import { IApiUserRes, IUserUpdate } from '../models/users';
import { Observable } from 'rxjs';
import { IApiRes } from '../models/common';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(
    private http:HttpClient
  ) { }

  
  findJobById(jobId:string){
    return this.http.get<IApiJobRes>(`employer/job/${jobId}`)
  }

  createJob(jobData:IJobReq){
    return this.http.post<IApiJobsRes>('employer/create-job',jobData)
  }


  findJobs(criteria:any){
    return this.http.get<IApiJobsRes>('user/jobs',{params:criteria});
  }

  findSavedJobs(jobIds:string[]){
    const payload = { jobIds: jobIds };
    return this.http.post<IApiJobsRes>('user/saved-jobs',payload)
  }

  applyForJob(jobData:any){
    return this.http.post<IApiApplicationRes>('user/job/apply',jobData);
  }

  findAppliedJobs(userId:string){
    return this.http.get<IApiApplicationsRes>(`user/applied-jobs/${userId}`);
  }

  removeSavedJob(userId:string,jobId:string){
    return this.http.post<IApiUserRes>(`user/remove/saved-jobs/${userId}`,{jobId});
  }

  findEmployerJobs(employerId:string){
    return this.http.get<IApiJobsRes>(`employer/jobs/${employerId}`)
  }

  deleteEmployerJob(jobId:string){
    return this.http.get<IApiJobsRes>(`employer/delete-job/${jobId}`);
  }

  updateJob(jobId:string,jobData:IJobReq){
    return this.http.post<IApiJobRes>(`employer/update-job/${jobId}`,jobData);
  }

  findJobsForVerification(page: number = 1, limit: number = 10):Observable<IApiRes<IJobssAndCount |null >>{
    return this.http.get<IApiRes<IJobssAndCount |null >>(`admin/jobs?page=${page}&limit=${limit}`);
  }

  verifyJob(jobId:string):Observable<IApiJobRes>{
    return this.http.patch<IApiJobRes>(`admin/job-verify/${jobId}`,{});
  }
}
