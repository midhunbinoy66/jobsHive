import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiPlanAndCountRes, IApiPlanRes, IApiPlansRes, IPlan, IPlanReq, IPlanUpdate } from '../models/plans';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private http: HttpClient
  ) { }

  findAllPlans(pageNumber:number,pageSize:number){
    return this.http.get<IApiPlanAndCountRes>('user/plans',{params:{pageNumber:pageNumber,pageSize:pageSize}})
  }

  findUserPlan(planId:string ){
    return this.http.get<IApiPlanRes>(`user/plans/${planId}`);
  }

  savePlan(planData:IPlanReq){
    return this.http.post<IApiPlanRes>('admin/create-plan',planData)
  }

  deletePlan(planId:string):Observable<IApiPlanRes>{
    return this.http.patch<IApiPlanRes>(`admin/delete-plan/${planId}`,{});
  }

  editPlan(planId:string,planData:IPlanUpdate):Observable<IApiPlanRes>{
    return this.http.put<IApiPlanRes>(`admin/update-plan/${planId}`,planData);
  }
}
