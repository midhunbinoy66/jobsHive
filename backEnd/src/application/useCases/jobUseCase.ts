import { STATUS_CODES } from "../../infrastructure/constants/httpStatusCodes";
import { JobRepository } from "../../infrastructure/repositories/jobRepository";
import {  IApiJobRes, IApiJobsRes, IJobReq } from "../interfaces/types/job";



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

    async findJobs(title:string,location:string):Promise<IApiJobsRes>{
        try {
       
            const jobs = await this._jobRepository.findJobs(title,location) 
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

    async findUserSavedJobs(jobIds:string[],pageNumber:number,pageSize:number){
        try {
            const jobs = await this._jobRepository.findSavedJobs(jobIds,pageNumber,pageSize);

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

    async updateEmployerJob(jobId:string,jobData:IJobReq){
        try {
            const job = await this._jobRepository.updateJob(jobId,jobData);
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

    async deleteEmployerJob(jobId:string){
        try {

            const job = await this._jobRepository.deleteEmployerJob(jobId);
            if(job !== null){
                return {
                    status:STATUS_CODES.OK,
                    message:'Job deleted Succesfully',
                    data:job
                }
            }else{
                return {
                    status:STATUS_CODES.NOT_FOUND,
                    message:'Job with this id not found',
                    data:null
                }
            }
            
        } catch (error) {
            return{
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }

    async findEmployerJobs(employerId:string,page:number,pageSize:number){
        try {
    
            const jobsData = await this._jobRepository.findEmployerJObs(employerId,page,pageSize);
                return {
                    status:STATUS_CODES.OK,
                    message:'Success',
                    data:jobsData
                }

        } catch (error) {
            return{
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }

    
    async findJobforVerfication(page:number,limit:number){
        try {
            
            if( isNaN(page)) page =1
            if(isNaN(limit)) limit =10;
            const jobs = await this._jobRepository.findJobsForVerification(page,limit);
            const jobCount = await this._jobRepository.findJobscount();
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:{jobs:jobs,jobCount}
            }

        } catch (error) {
            return{
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }

    async verifyJob(jobId:string){
        try {
            
            const job = await this._jobRepository.verifyJob(jobId);
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:job
            }
        } catch (error) {
            return{
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }
}