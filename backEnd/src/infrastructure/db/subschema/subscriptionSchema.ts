import mongoose from "mongoose";
import { IUserSubscription } from "../../../entities/common";


export const userSubscriptionSchema = new mongoose.Schema<IUserSubscription & Document>({
    planId:{
        type:mongoose.Types.ObjectId,
        ref:'UserPlans'
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    }
})