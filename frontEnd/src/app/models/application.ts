import { IJobAddress } from "./common"

export interface IApplicationRes{
    _id:string
    userId:string
    jobId:string
    jobTitle:string
    jobLocation:IJobAddress
    appliedTime:Date
    status:string
    coverLetter:string
}

export interface IApiApplicationRes{
    status:number
    message:string
    data:IApplicationRes|null
}

export interface IApiApplicationsRes{
    status:number
    message:string
    data:IApplicationRes[] |null
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