export interface IApplicationRes{
    _id:string
    userId:string
    jobId:string
    appliedTime:Date
    status:string
    coverLetter:string
}

export interface IApiApplicationRes{
    status:number
    message:string
    data:IApiApplicationRes |null
}