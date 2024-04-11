import mongoose, { Model} from "mongoose";
import { IPlan } from "../../entities/plan";




const userPlanSchema  = new mongoose.Schema<IPlan & Document>({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    features:{
        type:[String]
    },
    duration:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

const  userPlanModel:Model<IPlan &Document> = mongoose.model<IPlan &Document>('UserPlans',userPlanSchema);

export default userPlanModel