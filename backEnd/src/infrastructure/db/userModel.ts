import mongoose, { Document, Model, Schema, } from "mongoose";
import { IUser } from "../../entities/user";
import { userAddressSchema } from "./subschema/addressSchema";
import { emailSchema } from "./base/emailSchema";
import { mobileSchema } from "./base/mobileSchema";

export const userSchema  =  new Schema<IUser & Document>({
    name:{
        type:String,
        required:[true,'Name is requierd'],
        minlength:[3,'minimum length of three characters'],
        maxlength:[20,'maximum length of 20 characters']
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false,
        required:true
    },
    profilePic:String,
    address: userAddressSchema,

})

userSchema.add(emailSchema);
userSchema.add(mobileSchema);


const userModel:Model<IUser & Document>  = mongoose.model<IUser & Document>('Users',userSchema);

export default userModel;