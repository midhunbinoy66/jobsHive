import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiJobsRes } from '../models/jobs';
import { IApiApplicationRes, IApiApplicationsRes } from '../models/application';
import { IApiUserRes } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(
    private http:HttpClient
  ) { }

  findJobs(criteria:any){
    return this.http.get<IApiJobsRes>('user/jobs',{params:criteria});
  }

  findSavedJobs(jobIds:string[]){
    const payload = { jobIds: jobIds };
    return this.http.post<IApiJobsRes>('user/saved-jobs',payload)
  }

  applyForJob(jobData:any){
    console.log(jobData);
    return this.http.post<IApiApplicationRes>('user/job/apply',jobData);
  }

  findAppliedJobs(userId:string){
    return this.http.get<IApiApplicationsRes>(`user/applied-jobs/${userId}`);
  }

  removeSavedJob(userId:string,jobId:string){
    return this.http.post<IApiUserRes>(`user/remove/saved-jobs/${userId}`,{jobId});
  }
}
