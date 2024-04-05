import { IJob } from "./job"
import { IUser } from "./user"

export interface IApplication{
    _id:string
    userId:IUser
    jobId:IJob
    appliedTime:Date
    status:string
    coverLetter:string
}