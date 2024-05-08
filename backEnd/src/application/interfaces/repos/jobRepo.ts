import { IJob } from "../../../entities/job";
import { IJobAndCount, IJobReq } from "../types/job";


export interface IJobRepo{
    saveJobDetails(job:IJobReq):Promise<IJob| null>;
    findJobById(id:string):Promise<IJob | null>
    findJobs(title:string,location:string,pageNumber:number,pageSize:number):Promise<IJobAndCount|null>
    findSavedJobs(jobIds:string[],pageNumber:number,pageSize:number):Promise<IJobAndCount|null>
    findAppliedJobs(jobIds:string[]):Promise<IJob[]|null>
    updateJob(jobId:string,jobData:IJobReq):Promise<IJob | null>
    deleteEmployerJob(jobId:string):Promise<IJob| null>
    // findEmployerJObs(employerId:string,page:number,pageSize:number):Promise<IJobAndCount[]|null>
    findEmployerJObs(employerId:string,page:number,pageSize:number):Promise<{ jobs: IJob[]; jobCount: number } | null>
    findJobsForVerification(page:number,limit:number):Promise<IJob[] | null>
    verifyJob(jobId:string):Promise<IJob | null>
    findJobscount():Promise<number>
    findJobsBySkill(skills:[string],pageNumber:number,pageSize:number):Promise<IJobAndCount | null>
}