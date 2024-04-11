import { STATUS_CODES } from "../../infrastructure/constants/httpStatusCodes";
import { IPlanRepo } from "../interfaces/repos/userPlanRespo";
import { IApiPlanRes, IApiPlansRes, IPlanReq } from "../interfaces/types/plan";


export class PlanUseCase{
    constructor(
        private _planRepository:IPlanRepo
    ){}

   async findPlan(planId:string):Promise<IApiPlanRes>{
        const planData = await this._planRepository.findPlan(planId);
        return {
            status: STATUS_CODES.OK,
            message:'Success',
            data:planData
        }
    }

    async findAllPlans():Promise<IApiPlansRes>{
    const plansData = await this._planRepository.findAllPlans();
    return {
        status:STATUS_CODES.OK,
        message:'Success',
        data:plansData
    } 
    } 

    async createNewPlan(planData:IPlanReq):Promise<IApiPlanRes>{
        const plan = await this._planRepository.createPlan(planData)
        return {
            status:STATUS_CODES.OK,
            message:'Success',
            data:plan
        } 
    }

    async deletePlan(planId:string):Promise<IApiPlanRes>{
        const plan = await this._planRepository.deletePlan(planId);
        return {
            status:STATUS_CODES.OK,
            message:'Success',
            data:plan
        }
    }

    async updatePlan(planId:string,planData:IPlanReq){
        const plan  = await this._planRepository.updatePlan(planId,planData);
        return {
            status:STATUS_CODES.OK,
            message:'Success',
            data:plan
        }
    }

}