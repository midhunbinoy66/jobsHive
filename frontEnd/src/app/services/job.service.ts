import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiJobsRes } from '../models/jobs';
import { IApiApplicationRes } from '../models/application';

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
}
