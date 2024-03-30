import mongoose, { Document, Model, Schema } from "mongoose";
import { emailSchema } from "./base/emailSchema";
import { employerAddressSchema } from "./subschema/addressSchema";
import { mobileSchema } from "./base/mobileSchema";
import { IEmployer } from "../../entities/employer";


const employerSchema:Schema = new Schema<IEmployer & Document>({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    },
    password:{
        type:String,
        required:true,
    },
    isBlocked:{
        type:Boolean,
        default:false
    },

})

employerSchema.add(emailSchema);
employerSchema.add(employerAddressSchema);
employerSchema.add(mobileSchema);

export const employerModel:Model<IEmployer & Document> = mongoose.model<IEmployer & Document>('Employers',employerSchema)
