import { Document, Schema } from "mongoose";


export const mobileSchema:Schema = new Schema<{mobile:string} & Document>({
    mobile:{
        type:String,
        sparse:true
    }
})