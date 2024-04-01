import { Document, Schema } from "mongoose";
import { IEmployerAddress, IUserAddress } from "../../../entities/common";


export  const userAddressSchema:Schema  =new Schema<IUserAddress & Document>({
    country:{
        type:String,
        // required:[true,'country is required']
    },
    state:{
        type:String,
        // required:[true,'state is requierd']
    },
    district:{
        type:String,
        // required:[true,'district is requierd']
    },
    city:{
        type:String,
        // required:[true,'district is requierd']
    },
    zip:{
        type:Number,
        // required:true
    }
})

export const employerAddressSchema: Schema = new Schema<IEmployerAddress & Document>({
    ...userAddressSchema.obj,
    landmark: String,
})

export const jobAddressSchema: Schema = new Schema<IEmployerAddress & Document>({
    ...userAddressSchema.obj,
    landmark: String,
})

