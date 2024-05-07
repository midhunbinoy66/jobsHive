import mongoose, { Document, Model, Schema, } from "mongoose";
import { IUser } from "../../entities/user";
import { userAddressSchema } from "./subschema/addressSchema";
import { emailSchema } from "./base/emailSchema";
import { mobileSchema } from "./base/mobileSchema";
import { userSubscriptionSchema } from "./subschema/subscriptionSchema";
import { walletSchema } from "./base/walletSchema";

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
    resume:String,
    address: userAddressSchema,
    isGoogleAuth:{
        type:Boolean,
        default:false,
        required:true
    },
    savedJobs:[{
        type:Schema.Types.ObjectId,
        ref:'Jobs'
    }],
    following:[{
        type:Schema.Types.ObjectId,
        ref:'Employer'
    }],
    subscription:userSubscriptionSchema

})

userSchema.add(emailSchema);
userSchema.add(mobileSchema);
userSchema.add(walletSchema);


const userModel:Model<IUser & Document>  = mongoose.model<IUser & Document>('Users',userSchema);

export default userModel;