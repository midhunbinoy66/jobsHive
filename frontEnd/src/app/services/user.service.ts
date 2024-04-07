import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiUserRes, IUserRes, IUserUpdate } from '../models/users';
import { Observable } from 'rxjs';
import { IApiResumeRes, IResumeUpdate } from '../models/resume';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http:HttpClient
  ) { }

  updateUserDetails(userId:string,userData:IUserUpdate):Observable<IApiUserRes>{
    return this.http.put<IApiUserRes>(`user/update/${userId}`,userData);
  }

  saveUserJob(userId:string,jobId:string):Observable<IApiUserRes>{
    const payload = { jobId: jobId };
    return this.http.put<IApiUserRes>(`user/saveJob/${userId}`,payload);
  }

  getUserResumeDetails(userId:string):Observable<IApiResumeRes>{
    return this.http.get<IApiResumeRes>(`user/resume/${userId}`);
  }

  saveUserResumeDetails(userId:string,resumeData:IResumeUpdate):Observable<IApiResumeRes>{

    return this.http.post<IApiResumeRes>(`user/resume/${userId}`,resumeData);
  }

  getUserDetails(userId:string):Observable<IApiUserRes>{
    return this.http.get<IApiUserRes>(`user/get/${userId}`);
  }
}
