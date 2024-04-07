import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiPlanRes, IApiPlansRes } from '../models/plans';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private http: HttpClient
  ) { }

  findAllPlans(){
    return this.http.get<IApiPlansRes>('user/plans')
  }

  findUserPlan(planId:string ){
    return this.http.get<IApiPlanRes>(`user/plan/:${planId}`);
  }

}
