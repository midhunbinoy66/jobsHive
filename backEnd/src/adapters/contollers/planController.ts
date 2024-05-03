import { PlanUseCase } from "../../application/useCases/planUseCase";
import { Request,Response, } from "express";

export class PlanController {
    constructor(
        private readonly _planUseCases:PlanUseCase
    ){}

    async findAllPlans(req:Request,res:Response){
        const page = parseInt(req.query.pageNumber as string)
        const pageSize = parseInt(req.query.pageSize as string); 
        const apiRes = await this._planUseCases.findAllPlans(page,pageSize);
        res.status(apiRes.status).json(apiRes);
    }

    async findPlan(req:Request,res:Response){
        const planId = req.params.planId;
        console.log(planId);
        const apiRes = await this._planUseCases.findPlan(planId);
        res.status(apiRes.status).json(apiRes);

    }

    async createPlan(req:Request,res:Response){
        const planData = req.body;
        const apiRes = await this._planUseCases.createNewPlan(planData);
        res.status(apiRes.status).json(apiRes);
    }

    async deletePlan(req:Request,res:Response){
        const planId = req.params.planId;
        const apiRes = await this._planUseCases.deletePlan(planId);
        res.status(apiRes.status).json(apiRes);
    }

    async updatPlan(req:Request,res:Response){
        const planId  = req.params.planId;
        const planData = req.body;
        const apiRes = await this._planUseCases.updatePlan(planId,planData);
        res.status(apiRes.status).json(apiRes);
    }
    
}