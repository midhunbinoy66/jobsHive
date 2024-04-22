import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRevenueData } from '../models/chart';
import { IApiRes } from '../models/common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http:HttpClient
  ) { }

  getRevenueData():Observable<IApiRes<IRevenueData | null>>{
    return this.http.get<IApiRes<IRevenueData | null>>('admin/dashboard/revenue')
  }


}
