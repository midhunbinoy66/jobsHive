import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiJobsRes } from '../models/jobs';

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
}
