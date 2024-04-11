import { IPlan } from "../../../entities/plan";
import { IPlanReq } from "../types/plan";



export interface IPlanRepo{
    findPlan(planId:string):Promise<IPlan | null>
    findAllPlans():Promise<IPlan[]| null>
    createPlan(planData:IPlanReq):Promise<IPlan | null>
    deletePlan(planId:string):Promise<IPlan |null>
    updatePlan(planId:string,planData:IPlanReq):Promise<IPlan | null>
}