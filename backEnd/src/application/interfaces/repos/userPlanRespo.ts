import { IPlan } from "../../../entities/plan";
import { IPlanAndCount, IPlanReq } from "../types/plan";



export interface IPlanRepo{
    findPlan(planId:string):Promise<IPlan | null>
    findAllPlans(page:number,pageSize:number):Promise<IPlanAndCount| null>
    createPlan(planData:IPlanReq):Promise<IPlan | null>
    deletePlan(planId:string):Promise<IPlan |null>
    updatePlan(planId:string,planData:IPlanReq):Promise<IPlan | null>
}