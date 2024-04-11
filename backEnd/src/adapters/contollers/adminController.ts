import { AdminUseCase } from "../../application/useCases/adminUseCase";
import { UserUseCase } from "../../application/useCases/userUseCase";
import { IAdmin } from "../../entities/admin";
import { Request, Response } from "express";

export class AdminController{
    constructor(
        private readonly _adminUseCase:AdminUseCase,
        private readonly _userUseCase:UserUseCase
    )
    {}

    async adminLogin(req:Request,res:Response){
        const {email,password} = req.body as IAdmin
        const authData = await this._adminUseCase.verifyLogin(email,password);
        res.status(authData.status).json(authData);
    }

    async getAllUser(req:Request,res:Response){
        const page = parseInt(req.query.page as string);
        const limit = parseInt(req.query.limit as string);
        const searchQuery = req.query.searchQuery as string
        const apiRes = await this._userUseCase.getAllUser(page,limit,searchQuery);
        res.status(apiRes.status).json(apiRes)
    }

    async blockUser(req:Request,res:Response){
        const apiRes = await this._userUseCase.blockUser(req.params.userId as string);
        res.status(apiRes.status).json(apiRes)
        
    }
}