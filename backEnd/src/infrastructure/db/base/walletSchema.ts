import { Schema } from "mongoose";
import { IWalletHistory } from "../../../entities/common";
import { walletHistorySchema } from "../subschema/walletHistorySchema";

interface IWalletSchema {
    wallet: number
    walletHistory: IWalletHistory[]
}

export const walletSchema:Schema = new Schema<IWalletSchema & Document>({
    wallet:{
        type:Number,
        default:0,
        min:0,
        requierd:true
    },
    walletHistory:[walletHistorySchema]
})