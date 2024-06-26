import { Request, Response } from "express";
import { ApplicationUseCase } from "../../application/useCases/applicationUseCase";



export class ApplicationController{
    constructor(
        private readonly __applicationUseCase:ApplicationUseCase

    ){}

    async saveApplication(req:Request,res:Response){
        const jobData = req.body
        const apiRes = await this.__applicationUseCase.saveApplication(jobData);
        res.status(apiRes.status).json(apiRes);
    }

    async findUserApplications(req:Request,res:Response){
        const pageNumber = parseInt(req.query.pageNumber as string);
        const pageSize = parseInt(req.query.pageSize as string);
        const userId = req.params.userId
        const apiRes  = await this.__applicationUseCase.findUserApplications(userId,pageNumber,pageSize);
        res.status(apiRes.status).json(apiRes);

    }

    async findEmployerJobApplcations(req:Request,res:Response){
        const jobId = req.params.jobId
        const apiRes = await this.__applicationUseCase.findEmployerJobApplications(jobId);
        res.status(apiRes.status).json(apiRes);
    }

    async updateEmployerJobApplication(req:Request,res:Response){
        const applicationId = req.params.applicationId;
        const status = req.body
        console.log(applicationId,status);
        const apiRes = await this.__applicationUseCase.updateApplicationStatus(applicationId,status.status);
        res.status(apiRes.status).json(apiRes);
    }
}