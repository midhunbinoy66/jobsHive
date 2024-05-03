import { IPlan } from "../../../entities/plan"

export interface IApiPlanRes{
    status:number
    message:string
    data:IPlan | null

}

export interface IPlanRes extends IPlan {}

export interface IApiPlansRes{
    status:number
    message:string
    data:IPlan[] | null
}


export interface IApiPlanAndCountRes{
    status:number
    message:string
    data:IPlanAndCount | null
}

export interface IPlanAndCount{
    plans:IPlanRes[] | null
    planCount:number
}

export interface IPlanReq extends Omit<IPlan ,'_id'|'isActive'>{}