import { IPlanRepo } from "../../application/interfaces/repos/userPlanRespo";
import { IPlan } from "../../entities/plan";
import userPlanModel from "../db/userPlanModel";


export class PlanRepository implements IPlanRepo{
    findPlan(planId: string): Promise<IPlan | null> {
        return userPlanModel.findById(planId);
    }

    findAllPlans(): Promise<IPlan[] | null> {
        return userPlanModel.find()
    }

}