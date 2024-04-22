import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiRes, ISubscription, IWalletHistoryAndCount } from '../models/common';
import { Observable } from 'rxjs';
import { IUsersAndCount } from '../models/users';
import { IAPiEmployerRes, IApiEmployersRes, IEmployerUpdate, IEmployersAndCount } from '../models/employer';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(
    private readonly http:HttpClient
  ) { }

  getAllUsers(page:number,limit:number,searchQuery:string):Observable<IApiRes<IEmployersAndCount |null >>{
    return this.http.get<IApiRes<IEmployersAndCount | null>>(`admin/employers?=${page}&limit=${limit}&searchQuery=${searchQuery}`)
  }

  blockUser(userId:string):Observable<IAPiEmployerRes>{
    return this.http.patch<IAPiEmployerRes>(`admin/employers/block/${userId}`,{})
  }


  updateUserDetails(userId:string,userData:IEmployerUpdate):Observable<IAPiEmployerRes>{
    return this.http.put<IAPiEmployerRes>(`employer/update/${userId}`,userData);
  }

  getFollowingEmployers(employerIds:string[]):Observable<IApiEmployersRes>{
    return this.http.post<IApiEmployersRes>(`employer/following`,employerIds);
  }


  employerPlanSubscription(employerId:string,planData:ISubscription):Observable<IAPiEmployerRes>{
    return this.http.patch<IAPiEmployerRes>(`employer/subscription/${employerId}`,{planData})
  }

  updateEmployerWallet(employerId:string,amount:number):Observable<IAPiEmployerRes>{
    return this.http.patch<IAPiEmployerRes>(`employer/wallet/add/${employerId}`,{amount});

  }

  getWalletHistory(employerId:string,page:number,limit:number):Observable<IApiRes<IWalletHistoryAndCount | null>>{
    return this.http.get<IApiRes<IWalletHistoryAndCount|null>>(`employer/wallet-history/${employerId}?page=${page}&limit=${limit}`)
  }
}
