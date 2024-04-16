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


        const apiRes = await this._jobUseCase.findJobs(title,location);
        res.status(apiRes.status).json(apiRes);
    }

    async addJob(req:Request,res:Response){
        const job = req.body
        console.log(job)
        const apiRes = await this._jobUseCase.saveJob(job);
        res.status(apiRes.status).json(apiRes);
    }

    async getUserSavedJobs(req:Request,res:Response){
        const jobIds = req.body.jobIds;
        const apiRes = await this._jobUseCase.findUserSavedJobs(jobIds);
        res.status(apiRes.status).json(apiRes);
    }

    async deleteEmployerJob(req:Request,res:Response){
        const jobId = req.params.jobId
        const apiRes = await this._jobUseCase.deleteEmployerJob(jobId);
        res.status(apiRes.status).json(apiRes);
    }

    async getAllEmployerJob(req:Request,res:Response){
        const employerId = req.params.employerId;
        const apiRes = await this._jobUseCase.findEmployerJobs(employerId);
        res.status(apiRes.status).json(apiRes);
    }


    async updateEmployerJob(req:Request,res:Response){
        const jobId = req.params.jobId;
        const jobData = req.body;
        console.log(jobData,jobId)
        const apiRes = await this._jobUseCase.updateEmployerJob(jobId,jobData);
        res.status(apiRes.status).json(apiRes);
    }

    async getJobsforVerification(req:Request,res:Response){
        const page = parseInt(req.query.page as string);
        const limit = parseInt(req.query.limit as string);
        const apiRes  = await this._jobUseCase.findJobforVerfication(page,limit);
        res.status(apiRes.status).json(apiRes);
    }

    async verifyJob(req:Request,res:Response){
        const jobId = req.params.jobId;
        const apiRes = await this._jobUseCase.verifyJob(jobId);
        res.status(apiRes.status).json(apiRes);
        
    }
}