import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiTokenRes } from '../models/users';

const  baseUrl  = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(HttpClient) private readonly http:HttpClient
  ) { }

  getAccessToke(refreshToken:string):Observable<IApiTokenRes>{
    const httpOptions ={
        headers: new HttpHeaders({
          Authorization: `Bearer ${refreshToken}`,
          'Bypass-Interceptor': 'true'
        })
    }

    console.log(refreshToken, 'refresh token from get Access token service')
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${refreshToken}`,
    //   'Bypass-Interceptor': 'true'
    // })
    return this.http.get<IApiTokenRes>(`${baseUrl}token`, httpOptions)
  }
}
