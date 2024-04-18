import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiUserRes, IApiUsersRes, IUserRes, IUserUpdate, IUsersAndCount } from '../models/users';
import { Observable } from 'rxjs';
import { IApiResumeRes, IResumeUpdate } from '../models/resume';
import { IApiRes, IWalletHistoryAndCount } from '../models/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http:HttpClient
  ) { }

  getAllUsers(page:number,limit:number,searchQuery:string):Observable<IApiRes<IUsersAndCount |null >>{
    return this.http.get<IApiRes<IUsersAndCount | null>>(`admin/users?=${page}&limit=${limit}&searchQuery=${searchQuery}`)
  }

  blockUser(userId:string):Observable<IApiUserRes>{
    return this.http.patch<IApiUserRes>(`admin/users/block/${userId}`,{})
  }

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

  followEmployer(userId:string,employerId:string):Observable<IApiUserRes>{
    console.log(userId,'userId');
    console.log(employerId,'employerId');

    return this.http.patch<IApiUserRes>(`user/follow/${userId}`,{employerId});
  }

  unfollowEmployer(userId: string, employerId: string): Observable<IApiUserRes> {
    return this.http.patch<IApiUserRes>(`user/unfollow/${userId}`, { employerId });
  }

  getWalletHistory(userId:string,page:number,limit:number):Observable<IApiRes<IWalletHistoryAndCount | null>>{
    return this.http.get<IApiRes<IWalletHistoryAndCount|null>>(`user/wallet-history/${userId}?page=${page}&limt=${limit}`)
  }
}
