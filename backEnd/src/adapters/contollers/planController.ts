import { PlanUseCase } from "../../application/useCases/planUseCase";
import { Request,Response, } from "express";

export class PlanController {
    constructor(
        private readonly _planUseCases:PlanUseCase
    ){}

    async findAllPlans(req:Request,res:Response){
        const apiRes = await this._planUseCases.findAllPlans();
        res.status(apiRes.status).json(apiRes);
    }

    async findPlan(req:Request,res:Response){
        const planId = req.params.planId;
        const apiRes = await this._planUseCases.findPlan(planId);
        res.status(apiRes.status).json(apiRes);

    }
}