import { IJob } from "../../../entities/job";
import {IJobReq } from "../types/job";


export interface IJobRepo{
    saveJobDetails(job:IJobReq):Promise<IJob| null>;
    findJobById(id:string):Promise<IJob | null>
    findJobs(title:string,location:string):Promise<IJob[]|null>
    findSavedJobs(jobIds:string[]):Promise<IJob[]|null>
    findAppliedJobs(jobIds:string[]):Promise<IJob[]|null>
    deleteEmployerJob(jobId:string):Promise<IJob| null>
    findEmployerJObs(employerId:string):Promise<IJob[]|null>
}