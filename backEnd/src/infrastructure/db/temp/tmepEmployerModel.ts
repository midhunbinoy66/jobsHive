import mongoose, { Model, Schema } from "mongoose";
import { ITempEmployerRes } from "../../../application/interfaces/types/tempEmployer";
import { emailSchema } from "../base/emailSchema";
import { employerAddressSchema} from "../subschema/addressSchema";


const tempEmployerSchema :Schema = new Schema<ITempEmployerRes & Document>({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        trim:true
    },
    otp:{
        type:Number
    },
    password:{
        type:String,
        required:true
    },


    expireAt:{
        type:Date,
        default:Date.now(),
        expires:60 * 15
    }
})


tempEmployerSchema.add(emailSchema);
tempEmployerSchema.add(employerAddressSchema)
tempEmployerSchema.index({expireAt:1},{expireAfterSeconds:60*15});

export const tempEmployerModel:Model<ITempEmployerRes & Document> = mongoose.model<ITempEmployerRes & Document>('TempEmployers',tempEmployerSchema)