import { IApplication } from "../../../entities/application";
import { IApplcationAndCountRes, IApplicationReq } from "../types/application";
import { IEmployerDashboardData } from "../types/employer";


export interface IApplicantRepo{
    saveApplication(applicationData:IApplicationReq):Promise<IApplication | null>
    findAllApplication(userId:string,pageNumber:number,pageSize:number):Promise<IApplcationAndCountRes|null>
    findApplicaitonById(applicationId:string):Promise<IApplication|null>
    findApplicationByJobId(jobId:string):Promise<IApplication[]|null>
    updateApplicationStatus(applicationId:string,status:string):Promise<IApplication | null>
    findApplicationByEmployerId(employerId: string): Promise<IApplication[] | null> 
    getDashBoardData(employerId:string):Promise<IEmployerDashboardData| null>
} 