import { NextFunction, Request, Response } from "express";
import { EmployerRepository } from "../repositories/employerRepository";
import { STATUS_CODES } from "../constants/httpStatusCodes";
import jwt, { JwtPayload } from 'jsonwebtoken'

const employerRepository = new EmployerRepository()
const { FORBIDDEN, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = STATUS_CODES


export const employerAuth = async (req:Request,res:Response,next:NextFunction)=>{
try {
    const token = req.headers.authorization;
    if(token){
        const decoded = jwt.verify(token.slice(7),process.env.JWT_SECRET_KEY as string) as JwtPayload
        const employerData = await employerRepository.findById(decoded.id);
        if(employerData !== null){
            if(employerData.isBlocked){
                res.status(FORBIDDEN).json({message:'Employer is blocked'})
            }else{
                next();
            }
        }else{
            res.status(UNAUTHORIZED).json({message:'Employer is unauhtorized'});
        }
        
    }else{
        res.status(UNAUTHORIZED).json({message:'Token is not available'})
    }
    
} catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({message: 'Not authorized, invalid token'})
}
}