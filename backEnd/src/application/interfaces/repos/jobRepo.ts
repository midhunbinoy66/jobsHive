import { IJob } from "../../../entities/job";
import { IApiCriteria,IJobReq } from "../types/job";


export interface IJobRepo{
    saveJobDetails(job:IJobReq):Promise<IJob| null>;
    findJobById(id:string):Promise<IJob | null>
    findJobs(criteria:IApiCriteria):Promise<IJob[]|null>
    findSavedJobs(jobIds:string[]):Promise<IJob[]|null>
    findAppliedJobs(jobIds:string[]):Promise<IJob[]|null>
}