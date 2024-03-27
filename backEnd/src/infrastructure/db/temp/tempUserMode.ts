import mongoose, { Document, Model, Schema } from "mongoose";
import { ITempUserRes } from "../../../application/interfaces/types/tempUser";
import { emailSchema } from "../base/emailSchema";


const tempUserSchema:Schema = new Schema<ITempUserRes & Document>({

    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        trim:true
    },
    otp:{
        type:Number,
    },
    password:{
        type:String,
        required:true
    },
    expireAt:{
        type:Date,
        default:Date.now,
        expires:60 *15
    }
})

tempUserSchema.add(emailSchema);
tempUserSchema.index({expireAt:1},{expireAfterSeconds:60*15});

export const tempUserModel:Model <ITempUserRes & Document>  = mongoose.model<ITempUserRes&Document>('TempUsers',tempUserSchema)