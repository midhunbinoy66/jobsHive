import mongoose, { Model, Schema,} from "mongoose";
import { IApplication } from "../../entities/application";


const applicationSchema :Schema = new Schema<IApplication & Document>({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        required:true
    },
    jobId:{
        type:mongoose.Types.ObjectId,
        ref:'Jobs',
        required:true
    },
    jobTitle:{
        type:String
    },
    jobLocation:{
        type:String
    },
    appliedTime:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        default:'processing',
        enum:['processing','rejected','approved']
    },
    coverLetter:{
        type:String
    },
    resume:{
        type:String
    }
})


const applicationModel:Model<IApplication& Document> = mongoose.model<IApplication & Document>('Applicaitons',applicationSchema)
export default applicationModel;