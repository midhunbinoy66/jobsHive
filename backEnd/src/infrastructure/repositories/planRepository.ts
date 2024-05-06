import { IPlanRepo } from "../../application/interfaces/repos/userPlanRespo";
import { IPlanAndCount, IPlanReq } from "../../application/interfaces/types/plan";
import { IPlan } from "../../entities/plan";
import userPlanModel from "../db/userPlanModel";


export class PlanRepository implements IPlanRepo{
    async findPlan(planId: string): Promise<IPlan | null> {
        return await userPlanModel.findById(planId);
    }

    async findAllPlans(page:number,pageSize:number): Promise<IPlanAndCount | null> {
        const skip = (page - 1) * pageSize;
        const plans = await userPlanModel.find({isActive:true})
        .skip(skip)
        .limit(pageSize)
        .exec();

        const planCount = await userPlanModel.countDocuments({isActive:true});

        return {
            plans:plans,
            planCount:planCount
        }
    }

   async createPlan(planData: IPlanReq): Promise<IPlan | null> {
       return await new userPlanModel(planData).save();
   }

   async deletePlan(planId: string): Promise<IPlan | null> {
        return await userPlanModel.findByIdAndUpdate(
            {_id:planId},
            {
                $set:{isActive:false}
            },
            {new:true}
        )
   }

   async updatePlan(planId: string, planData: IPlanReq): Promise<IPlan | null> {
        return await userPlanModel.findByIdAndUpdate(
            {_id:planId},
            {
                $set:
                {
                    name:planData.name,
                    description:planData.description,
                    duration:planData.duration,
                    price:planData.price,
                    features:planData.features
                }
            },
            {new:true}
        )
   }

}