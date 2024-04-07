import { IPlan } from "../../../entities/plan";



export interface IPlanRepo{
    findPlan(planId:string):Promise<IPlan | null>
    findAllPlans():Promise<IPlan[]| null>
}