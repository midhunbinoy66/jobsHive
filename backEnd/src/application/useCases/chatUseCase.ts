import { STATUS_CODES } from "../../infrastructure/constants/httpStatusCodes";
import { IChatRepo } from "../interfaces/repos/chatRepo";
import { IApiChatRes, IChatReadReqs, IChatReqs, IChatRes, IUserListForChats } from "../interfaces/types/chat";
import { IApiRes } from "../interfaces/types/commont";

export class ChatUseCase{
    constructor(
        private readonly _chatRepository:IChatRepo
    ){}

    async sendMessage(chatData:IChatReqs):Promise<IApiChatRes>{
        try {
            
            if(((chatData.userId && chatData.employerId) || (chatData.userId && chatData.adminId) || (chatData.employerId && chatData.adminId)) && !(chatData.userId  && chatData.employerId && chatData.adminId)){
                const saveMessage = await this._chatRepository.saveMessage(chatData);
                return {
                    status:STATUS_CODES.OK,
                    message:'Success',
                    data:saveMessage as IChatRes
                }
            }else{
                return {
                    status:STATUS_CODES.BAD_REQUEST,
                    message:'Error',
                    data:null
                }
            }

        } catch (error) {
                console.log(error,'error while saving chat');
                throw Error('error while saving message');
        }
    }

    async getChatHistory(userId:string | undefined , employerId:string | undefined ,adminId:string | undefined): Promise<IApiChatRes>{

        try {

            console.log(userId,employerId);
            
            if(((userId && employerId) || (userId && adminId) || (employerId && adminId) && !(userId && employerId && adminId))){
                const chats = await this._chatRepository.getChatHistory(userId,employerId,adminId);
                return {
                    status:STATUS_CODES.OK,
                    message:'Success',
                    data:chats
                }
            }else{
                return {
                    status:STATUS_CODES.BAD_REQUEST,
                    message:'Error',
                    data:null
                }
            }

        } catch (error) {
            console.log(error,'error while saving chat');
            
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Error',
                data:null
            }

        }
    }

    async getUsersChattedWith(employerId:string):Promise<IApiRes<IUserListForChats[]| null>>{
        try {
            const users = await this._chatRepository.getUsersChattedWith(employerId);
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:users
            }
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Error',
                data:null
            }

        }
    }


    async markLastMsgRead(msgData:IChatReadReqs):Promise<IApiRes<null>>{
        try {
            if(msgData.userId === '') msgData.userId = undefined
            if(msgData.employerId === '') msgData.employerId  = undefined
            if(msgData.adminId === '') msgData.adminId = undefined
            if (((msgData.userId && msgData.employerId) || (msgData.userId && msgData.adminId) || (msgData.employerId && msgData.adminId)) && 
            !(msgData.userId && msgData.employerId && msgData.adminId)
        ) {
            await this._chatRepository.markLastMsgAsRead(msgData)
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:null
            }
        } else{
            return {
                status:STATUS_CODES.BAD_REQUEST,
                message:'Error',
                data:null
            }
        }
            
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Error',
                data:null
            }
        }
    }

}