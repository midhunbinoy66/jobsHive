import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiRes } from '../models/common';
import { Observable } from 'rxjs';
import { IUsersAndCount } from '../models/users';
import { IAPiEmployerRes, IEmployerUpdate, IEmployersAndCount } from '../models/employer';

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

}
