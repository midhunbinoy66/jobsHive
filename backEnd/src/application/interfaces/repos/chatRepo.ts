import { IChatReadReqs, IChatReqs, IChatRes, IUserListForChats } from "../types/chat";
import { IEmployerRes } from "../types/employer";

export interface IChatRepo{
    saveMessage(chatReq:IChatReqs):Promise<IChatRes | null>
    getChatHistory(userId:string | undefined , employerId:string | undefined ,adminId: string | undefined ):Promise<IChatRes | null>
    getEmployersChattedWith(userId:string):Promise<IEmployerRes[]>
    getUsersChattedWith(employerId:string):Promise<IUserListForChats[]>
    markLastMsgAsRead(msgData:IChatReadReqs):Promise<undefined>
}