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
        const userId = req.params.userId
        const apiRes  = await this.__applicationUseCase.findUserApplications(userId);
        res.status(apiRes.status).json(apiRes);

    }
}