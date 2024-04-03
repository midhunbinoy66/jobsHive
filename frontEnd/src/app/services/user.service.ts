import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiUserRes, IUserRes, IUserUpdate } from '../models/users';
import { Observable } from 'rxjs';

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

}
