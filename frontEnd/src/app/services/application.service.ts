import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiApplicationRes, IApiApplicationsRes, IApplicationRes } from '../models/application';
import { Observable } from 'rxjs';

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

  updateApplication(applicationId:string,status:any):Observable<IApiApplicationRes>{
    return this.http.patch<IApiApplicationRes>(`employer/application/${applicationId}`,status)
  }

}
