import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiApplicationsRes } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(
    private http:HttpClient
  ) { }

  findApplicationByJobId(jobId:string){
    return this.http.get<IApiApplicationsRes>(`employer/applications/${jobId}`);
  }

}
