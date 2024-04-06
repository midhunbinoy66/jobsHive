import mongoose from "mongoose";
import { IUserEducation } from "../../../entities/common";


export const userEducationSchema = new mongoose.Schema<IUserEducation & Document>({
    institution:{
        type:String
    },
    degree:{
        type:String
    },
    fieldOfStudy:{
        type:String
    },
    eduStartDate:{
        type:String
    },
    eduEndDate:{
        type:String
    }
})