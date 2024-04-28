import mongoose, { Model,  Schema } from "mongoose";
import { IChatHistory } from "../../application/interfaces/types/chat";




export const chatSchema:Schema = new Schema<IChatHistory & Document>({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
        validate: function (this: IChatHistory) {
            return validateParticipants(this.userId, this.employerId, this.adminId)
        },
    },
    employerId:{
        type:mongoose.Types.ObjectId,
        ref:'Employers',
        validate: function (this: IChatHistory) {
            return validateParticipants(this.userId, this.employerId, this.adminId)
        },
    },
    adminId:{
        type:mongoose.Types.ObjectId,
        ref:'Admins',
        validate:function(this:IChatHistory){
            return validateParticipants(this.userId, this.employerId,this.adminId);
        }
    },
    messages:[{
        sender:{
            type:String,
            enum:['User','Employer','Admin'],
            required:true
        },
        message:{
            type:String,
            required:true
        },
        time:{
            type:Date,
            default:Date.now(),
            required:true
        },
        isRead: {
            type: Boolean,
            default: false,
            required: true
        }
    }]
},
{
    timestamps:true
})

chatSchema.index({ userId: 1, employerId: 1, adminId: 1 }, { unique: true });

function validateParticipants(userId: string | undefined, employerId: string | undefined, adminId: string | undefined) {
    const fieldsCount = [userId, employerId, adminId].filter(Boolean).length;
    // console.log('validating, count == 2', fieldsCount);
    
    return fieldsCount === 2;
}


export const chatModel:Model<IChatHistory & Document> = mongoose.model<IChatHistory & Document>('Chats',chatSchema);