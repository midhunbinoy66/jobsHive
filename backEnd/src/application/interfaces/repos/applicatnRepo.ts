import { IApplication } from "../../../entities/application";
import { IApplicationReq } from "../types/application";


export interface IApplicantRepo{
    saveApplication(applicationData:IApplicationReq):Promise<IApplication | null>
    findAllApplication(userId:string):Promise<IApplication[]|null>
    findApplicaitonById(applicationId:string):Promise<IApplication|null>
    findApplicationByJobId(jobId:string):Promise<IApplication[]|null>
} 