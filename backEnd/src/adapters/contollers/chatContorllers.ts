import { Request, Response } from "express";
import { ChatUseCase } from "../../application/useCases/chatUseCase";
import { IChatReadReqs } from "../../application/interfaces/types/chat";



export class ChatController{
    constructor(
        private readonly _chatUseCase:ChatUseCase
    ){}
    
    async getChatHistory(req:Request,res:Response){
        const {userId,employerId,adminId} = req.query as unknown as IChatReadReqs;
        const apiRes = await this._chatUseCase.getChatHistory(userId,employerId,adminId);
        res.status(apiRes.status).json(apiRes);
    }

    async getEmployersChattedWith(req:Request,res:Response){
        const userId = req.params.userId;
        const apiRes = await this._chatUseCase.getUsersChattedWith(userId);
        res.status(apiRes.status).json(apiRes);
    }

    async getUsersChattedWith(req:Request,res:Response){
        const employerId = req.params.employerId
        const apiRes = await this._chatUseCase.getUsersChattedWith(employerId);
        res.status(apiRes.status).json(apiRes);
    }

    async markLastMsgAsRead (req: Request, res: Response) {
        const { userId, employerId, adminId, msgId } = req.query as unknown as IChatReadReqs
        const msgData: IChatReadReqs = { userId, employerId, adminId, msgId }
        const apiRes = await this._chatUseCase.markLastMsgRead(msgData)
        res.status(apiRes.status).json(apiRes)
    }
}