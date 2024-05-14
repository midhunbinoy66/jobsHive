import { IUserSubscription } from "../../entities/common";
import { employerModel } from "../db/employerModel";
import userModel from "../db/userModel";
import userPlanModel from "../db/userPlanModel";

export async function processSubscriptionQueue(){
    const usersWithPendingChanges = await userModel.find({subscriptionChangeQueue:{$exists:true,$not:{$size:0}}});
    for(const user of usersWithPendingChanges){
        if(user.subscription && user.subscription?.endDate<=new Date()){
            const changeRequest = user.subscriptionChangeQueue[0];
            const plan = await userPlanModel.findById({_id:changeRequest});

            const subscriptionData:IUserSubscription = {
                planId:plan!,
                startDate:new Date(),
                endDate :calculateEndDate(plan!.duration)
            }
    
            await userModel.findByIdAndUpdate(
                {_id:user._id},
                {
                    subscription:subscriptionData
                },
                {new:true}
            )

            user.subscriptionChangeQueue.shift();
            await user.save()
        }

    }
    
  }


  export async function processSubscriptionQueueEmployer(){
    const usersWithPendingChanges = await employerModel.find({subscriptionChangeQueue:{$exists:true,$not:{$size:0}}});
    for(const user of usersWithPendingChanges){
        if(user.subscription && user.subscription?.endDate<=new Date()){
            const changeRequest = user.subscriptionChangeQueue[0];
            const plan = await userPlanModel.findById({_id:changeRequest});

            const subscriptionData:IUserSubscription = {
                planId:plan!,
                startDate:new Date(),
                endDate :calculateEndDate(plan!.duration)
            }
    
            await employerModel.findByIdAndUpdate(
                {_id:user._id},
                {
                    subscription:subscriptionData
                },
                {new:true}
            )

            user.subscriptionChangeQueue.shift();
            await user.save()
        }

    }
    
  }



  function calculateEndDate(duration:number):Date{
    const currentDate = new Date();
    const endDate = new Date(currentDate.getTime() + duration * 30 * 24 * 60 * 60 * 1000);
    return endDate
  }