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
        type:{
            jobApplications: {
                type: Number,
                default: 20 // Default value for basic plan
            },
            unlimitedSearch: {
                type: Boolean,
                default: true // Default value for basic plan
            },
            chatFacility: {
                type: Boolean,
                default: false // Default value for basic plan
            }
        }
    },
    isActive:{
        type:Boolean,
        default:true
    },
    type:{
        type:String
    },
    duration:{
        type:Number
    }
})

const  userPlanModel:Model<IPlan &Document> = mongoose.model<IPlan &Document>('UserPlans',userPlanSchema);

export default userPlanModel