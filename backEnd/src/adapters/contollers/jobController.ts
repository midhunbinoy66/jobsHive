import { Request,Response, } from "express";
import { JobUseCase } from "../../application/useCases/jobUseCase";


export class JobController{
    constructor(
        private readonly _jobUseCase:JobUseCase
    ){}

    async getJobDetails(req:Request,res:Response){
        const jobId = req.params.jobId;
        const apiRes = await this._jobUseCase.findJob(jobId);
        res.status(apiRes.status).json(apiRes);
    }

    async getJobs(req:Request,res:Response){
        const  title = req.query.title as string;
        const location = req.query.location as string;
        const pageNumber = parseInt(req.query.pageNumber as string) ;
        const pageSize  =  parseInt(req.query.pageSize as string) ;
        const apiRes = await this._jobUseCase.findJobs(title,location,pageNumber,pageSize);
        res.status(apiRes.status).json(apiRes);
    }

    async getJobsBySkill(req:Request,res:Response){
        const skills = req.body.skills
        const pageNumber = parseInt(req.query.pageNumber as string) ;
        const pageSize  =  parseInt(req.query.pageSize as string) 
        const apiRes = await this._jobUseCase.findJobsBySkill(skills,pageNumber,pageSize);
        res.status(apiRes.status).json(apiRes)
    }

    async addJob(req:Request,res:Response){
        const job = req.body
        console.log(job)
        const apiRes = await this._jobUseCase.saveJob(job);
        res.status(apiRes.status).json(apiRes);
    }

    async getUserSavedJobs(req:Request,res:Response){
        const jobIds = req.body.jobIds;
        const pageNumber = parseInt(req.query.pageNumber as string)
        const pageSize = parseInt(req.query.pageSize as string)
        const apiRes = await this._jobUseCase.findUserSavedJobs(jobIds,pageNumber,pageSize);
        res.status(apiRes.status).json(apiRes);
    }

    async deleteEmployerJob(req:Request,res:Response){
        const jobId = req.params.jobId
        const apiRes = await this._jobUseCase.deleteEmployerJob(jobId);
        res.status(apiRes.status).json(apiRes);
    }

    async getAllEmployerJob(req:Request,res:Response){
        const employerId = req.params.employerId;
        const page = parseInt(req.query.pageNumber as string)
        const pageSize = parseInt(req.query.pageSize as string); 
        const apiRes = await this._jobUseCase.findEmployerJobs(employerId,page,pageSize);
        res.status(apiRes.status).json(apiRes);
    }
    
    async updateEmployerJob(req:Request,res:Response){
        const jobId = req.params.jobId;
        const jobData = req.body;
        const apiRes = await this._jobUseCase.updateEmployerJob(jobId,jobData);
        res.status(apiRes.status).json(apiRes);
    }

    async getJobsforVerification(req:Request,res:Response){
        const pageNumber = parseInt(req.query.pageNumber as string);
        const pageSize = parseInt(req.query.pageSize as string);
        const apiRes  = await this._jobUseCase.findJobforVerfication(pageNumber,pageSize);
        res.status(apiRes.status).json(apiRes);
    }

    async verifyJob(req:Request,res:Response){
        const jobId = req.params.jobId;
        const apiRes = await this._jobUseCase.verifyJob(jobId);
        res.status(apiRes.status).json(apiRes);
        
    }
}