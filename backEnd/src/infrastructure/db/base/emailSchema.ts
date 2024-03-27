import { Schema } from "mongoose";
import { emailRegex } from "../../constants/constants";


export const emailSchema:Schema  = new Schema<{email:string}>({
    email:{
        type:String,
        required:true,
        unique:true,
        match:new RegExp(emailRegex)

    }
})