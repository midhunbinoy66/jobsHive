import { Schema } from "mongoose";
import { IWalletHistory } from "../../../entities/common";



export const walletHistorySchema = new Schema<IWalletHistory & Document>({
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:[true,'Message is required']
    }
})