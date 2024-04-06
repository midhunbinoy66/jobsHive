import mongoose from "mongoose";
import { IUserWorkExp } from "../../../entities/common";


export const userWorkExperienceSchema = new mongoose.Schema<IUserWorkExp & Document>({
    companyName:{
        type:String
    },
    jobTitle:{
        type:String
    },
    location:{
        type:String
    },
    workStartDate:{
        type:String
    },
    workEndDate:{
        type:String
    }
})