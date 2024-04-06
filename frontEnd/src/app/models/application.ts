export interface IApplicationRes{
    _id:string
    userId:string
    jobId:string
    jobTitle:string
    jobLocation:string
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