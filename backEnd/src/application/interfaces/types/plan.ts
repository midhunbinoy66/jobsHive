import { IPlan } from "../../../entities/plan"

export interface IApiPlanRes{
    status:number
    message:string
    data:IPlan | null

}

export interface IApiPlansRes{
    status:number
    message:string
    data:IPlan[] | null
    
}

export interface IPlanReq extends Omit<IPlan ,'_id'|'isActive'>{}