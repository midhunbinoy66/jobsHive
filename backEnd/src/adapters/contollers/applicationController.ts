import { Request, Response } from "express";
import { ApplicationUseCase } from "../../application/useCases/applicationUseCase";



export class ApplicationController{
    constructor(
        private readonly __applicationUseCase:ApplicationUseCase

    ){}

    async saveApplication(req:Request,res:Response){
        const applicationData = req.body.application
        const apiRes = await this.__applicationUseCase.saveApplication(applicationData);
        res.status(apiRes.status).json(apiRes);
    }
}