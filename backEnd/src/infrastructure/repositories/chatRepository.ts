import { IChatRepo } from "../../application/interfaces/repos/chatRepo";
import { IChatReadReqs, IChatReqs, IChatRes, IUserListForChats } from "../../application/interfaces/types/chat";
import { IEmployerRes } from "../../application/interfaces/types/employer";
import { IUserRes } from "../../application/interfaces/types/user";
import { chatModel } from "../db/chatModel";


export class ChatRepository implements IChatRepo{
    async saveMessage(chatReq: IChatReqs): Promise<IChatRes | null> {
        return await chatModel.findOneAndUpdate(
            {
                userId:chatReq.userId,
                employerId:chatReq.employerId,
                adminId:chatReq.adminId
            },
            {
                $push: {
                    messages: {
                        sender: chatReq.sender,
                        message: chatReq.message
                    }
                }
            },
            { 
                new: true,
                upsert: true
            }
        )
    }

    async getChatHistory(userId: string | undefined, employerId: string | undefined, adminId: string | undefined): Promise<IChatRes | null> {
        return await chatModel.findOneAndUpdate(
            {userId,employerId,adminId},
            {$set:{ "messages.$[].isRead":true}},
            {new:true}
        )
    }

    async getEmployersChattedWith(userId: string): Promise<IEmployerRes[]> {
        const allChats = await chatModel.find({userId}).populate('employerId');
        const employers  = allChats.map(chat=>chat.employerId);
        return employers as unknown as IEmployerRes[]
    }

    async getUsersChattedWith(employerId: string): Promise<IUserListForChats[]> {
        const allChats = await chatModel.find({employerId}).populate('userId');
        const users:IUserListForChats[] = allChats.map(chat=>{
            const unreadCount = chat.messages.filter(msg => msg.sender === 'User' && msg.isRead === false).length
            const { _id, name, profilePic } = chat.userId as unknown as IUserRes
            return { _id, name, profilePic, unreadCount }
        })

        return users
    }

    async markLastMsgAsRead (msgData: IChatReadReqs): Promise<undefined> {
        const { userId, employerId, adminId, msgId } = msgData
        await chatModel.findOneAndUpdate(
            { userId, employerId, adminId, 'messages._id': msgId },
            {
              $set: {
                'messages.$.isRead': true,
              },
            }
        );
    }

}