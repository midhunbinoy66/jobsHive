import mongoose, { Model, Schema } from "mongoose";
import { ITransaction } from "../../entities/tranaction";



const transactionSchema:Schema = new Schema<ITransaction & Document>({

    userId:{
        type:mongoose.Types.ObjectId,
        ref:'Users'
    },
    employerId:{
        type:mongoose.Types.ObjectId,
        ref:'Employers'
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    planId:{
        type:mongoose.Types.ObjectId,
        ref:'UserPlans'

    }

})

const transactionModel:Model<ITransaction & Document> = mongoose.model<ITransaction & Document>('transactionModel',transactionSchema);

export default transactionModel
