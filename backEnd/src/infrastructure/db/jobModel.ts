import mongoose, { Document, Model, Schema } from "mongoose";
import { IJob } from "../../entities/job";


const jobSchema:Schema  = new Schema<IJob &Document>({
    title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    },
    salary:{
        type:Number,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    description:{
        type:String,
        required:true
    },
    type:{
        type:String,
    },
    tags:{
        type:[String],

    },
    requierments:{
        type:[String],

    },
    responsibilities:{
        type:[String],

    },
    employer:{
        type:Schema.Types.ObjectId,
        ref:'Employers'
    },
    localtion:{
        type:String,
    }
    
})


const jobModel:Model<IJob&Document> = mongoose.model<IJob &Document>('Jobs',jobSchema)

export default jobModel;