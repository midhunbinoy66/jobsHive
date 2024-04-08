import { STATUS_CODES } from "../../infrastructure/constants/httpStatusCodes";
import { IPlanRepo } from "../interfaces/repos/userPlanRespo";
import { IApiPlanRes, IApiPlansRes } from "../interfaces/types/plan";


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

}