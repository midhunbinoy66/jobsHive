import { AdminUseCase } from "../../application/useCases/adminUseCase";
import { IAdmin } from "../../entities/admin";
import { Request, Response } from "express";

export class AdminController{
    constructor(
        private readonly _adminUseCase:AdminUseCase,
    )
    {}

    async adminLogin(req:Request,res:Response){
        const {email,password} = req.body as IAdmin
        const authData = await this._adminUseCase.verifyLogin(email,password);
        res.status(authData.status).json(authData);
    }
}