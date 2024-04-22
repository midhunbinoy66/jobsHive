import { AdminUseCase } from "../../application/useCases/adminUseCase";
import { EmployeruseCase } from "../../application/useCases/employerUseCase";
import { TransactionUseCase } from "../../application/useCases/trasactionUseCase";
import { UserUseCase } from "../../application/useCases/userUseCase";
import { IAdmin } from "../../entities/admin";
import { Request, Response } from "express";

export class AdminController{
    constructor(
        private readonly _adminUseCase:AdminUseCase,
        private readonly _userUseCase:UserUseCase,
        private readonly _employerUseCase:EmployeruseCase,
        private readonly _transactionUseCase:TransactionUseCase
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

    async getAllEmployers(req:Request,res:Response){
        const page = parseInt(req.query.page as string);
        const limit = parseInt(req.query.limit as string);
        const searchQuery = req.query.searchQuery as string
        const apiRes = await this._employerUseCase.getAllUser(page,limit,searchQuery);
        res.status(apiRes.status).json(apiRes)
    }

    async blockEmployers(req:Request,res:Response){
        const apiRes = await this._employerUseCase.blockUser(req.params.userId as string);
        res.status(apiRes.status).json(apiRes)
    }

    async getRevenueData(req:Request,res:Response){
        const apiRes = await this._transactionUseCase.getRevenueAdmin();
        res.status(apiRes.status).json(apiRes);
    }
}