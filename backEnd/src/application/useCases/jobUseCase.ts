import { STATUS_CODES } from "../../infrastructure/constants/httpStatusCodes";
import { JobRepository } from "../../infrastructure/repositories/jobRepository";
import { IApiCriteria, IApiJobRes, IApiJobsRes, IJobReq } from "../interfaces/types/job";



export class JobUseCase{
    constructor(
        private readonly _jobRepository:JobRepository
    ){}

    async saveJob(jobData:IJobReq):Promise<IApiJobRes>{
        try {
                if(jobData === undefined){
                    return{
                        status:STATUS_CODES.BAD_REQUEST,
                        message:'no job data recieved',
                        data:null
                    }
                }

                const job = await this._jobRepository.saveJobDetails(jobData);
                return {
                    status:STATUS_CODES.OK,
                    message:'Success',
                    data:job
                }
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }

    async findJobs(criteria:IApiCriteria):Promise<IApiJobsRes>{
        try {
       
            const jobs = await this._jobRepository.findJobs(criteria) 
                return{
                    status:STATUS_CODES.OK,
                    message:'Success',
                    data:jobs
                }
  
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }
    

    async findJob(id:string){
        try {
            const job = await this._jobRepository.findJobById(id);
            if(job !== null){
                return{
                    status:STATUS_CODES.OK,
                    message:'Success',
                    data:job
                }
            }else{
                return {
                    status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                    message:'Internal server error',
                    data:null
                }
            }
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }

    async findUserSavedJobs(jobIds:string[]){
        try {
            const jobs = await this._jobRepository.findSavedJobs(jobIds);

                return {
                    status:STATUS_CODES.OK,
                    message:'Success',
                    data:jobs
                }
            
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }

    
}