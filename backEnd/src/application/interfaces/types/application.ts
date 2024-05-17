import { IApplication } from "../../../entities/application";

export interface IApplicationRes extends IApplication{}

export interface  IApiApplicationRes {
    status:number
    message:string
    data:IApplication | null
    
}

export interface  IApiApplicationsRes {
    status:number
    message:string
    data:IApplication[] | null
    
}


export interface IApplcationAndCountRes{
    applications:IApplicationRes[] | null,
    applicationsCount:number
}

export interface IApiApplicationAndCountRes{
    status:number,
    message:string,
    data:IApplcationAndCountRes
}

export interface IApplicationReq extends Omit<IApplication,'_id'|'status'|'appliedTime'>{}


