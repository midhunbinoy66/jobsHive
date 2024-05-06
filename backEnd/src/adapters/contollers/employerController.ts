import { Request,Response } from "express";
import { EmployeruseCase } from "../../application/useCases/employerUseCase";
import { Encryptor } from "../../infrastructure/utils/bcryptPassword";
import { OTPGenerator } from "../../infrastructure/utils/otpGenerator";
import { IEmployerAuth, IEmployerUpdate } from "../../application/interfaces/types/employer";
import { ITempEmployerReq } from "../../application/interfaces/types/tempEmployer";
import { STATUS_CODES } from "../../infrastructure/constants/httpStatusCodes";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { IEmployer } from "../../entities/employer";



export class Employercontoller{
    constructor(
        private readonly _employerUseCase: EmployeruseCase,
        private readonly otpGenerator : OTPGenerator,
        private readonly encrypt:Encryptor
    ){}

    async employerRegister(req:Request,res:Response){
        const {name,email,password} = req.body as IEmployerAuth

        const isEmailExist = await this._employerUseCase.isEmailExist(email);
        if(isEmailExist===null){
            const otp = this.otpGenerator.genrateOTP();
            const securePassword  = await this.encrypt.encryptPassword(password);
            const employer:ITempEmployerReq = {name,email,password:securePassword,otp:otp};
            const tempEmployer = await this._employerUseCase.saveEmployerTemporarily(employer);
            this._employerUseCase.sendTimeoutOTP(tempEmployer._id,tempEmployer.email,otp);
            res.status(STATUS_CODES.OK).json({message: 'Success', token: tempEmployer.userAuthToken })
        }else{
            res.status(STATUS_CODES.FORBIDDEN).json({message: "Email already Exist"})
        }

    }

    async validateUserOTP (req:Request, res: Response){
        try {
            console.log('validating otp');
            console.log(req.body.otp,'req.body.otp');
            const { otp } = req.body
            const authToken = req.headers.authorization;
            // console.log(authToken, 'authToken from validate otp');
            
            if(authToken){
                const decoded = jwt.verify(authToken.slice(7), process.env.JWT_SECRET_KEY as string) as JwtPayload
                const user = await this._employerUseCase.findTempEmployerById(decoded.id)
                if(user){
                    if(otp == user.otp){
                        const savedData = await this._employerUseCase.saveEmployerDetails({
                            name: user.name,
                            email: user.email,
                            password: user.password
                        }) 
                        console.log('user details saved, setting status 200');
                        res.status(savedData.status).json(savedData)
                    }else{
                        console.log('otp didnt match');
                        res.status(STATUS_CODES.UNAUTHORIZED).json({message: 'Invalid OTP'})
                    }
                } else {
                    res.status(STATUS_CODES.UNAUTHORIZED).json({message: 'Timeout, Register again'})
                }
            }else{
                res.status(STATUS_CODES.UNAUTHORIZED).json({message: 'authToken missing, Register again'})
            }

        } catch (error) {
            console.log(error);
            // next(error)
        }
    }

    async resendOTP(req:Request, res: Response) {
        try {

            const authToken = req.headers.authorization;
            // console.log(authToken, 'authToken from resend otp');
            if(authToken){
                const decoded = jwt.verify(authToken.slice(7), process.env.JWT_SECRET_KEY as string) as JwtPayload
                const tempEmployer = await this._employerUseCase.findTempEmployerById(decoded.id)
                if(tempEmployer){
                    const OTP = this.otpGenerator.genrateOTP()
                    // console.log(tempEmployer, 'userData');
                    console.log(OTP, 'new resend otp');
                    await this._employerUseCase.updateOtp(tempEmployer._id, tempEmployer.email, OTP)
                    this._employerUseCase.sendTimeoutOTP(tempEmployer._id, tempEmployer.email, OTP)
                    res.status(STATUS_CODES.OK).json({message: 'OTP has been sent'})
                } else {
                    res.status(STATUS_CODES.UNAUTHORIZED).json({message: 'user timeout, register again'})
                }
            } else {
                res.status(STATUS_CODES.UNAUTHORIZED).json({message: 'AuthToken missing'})
            }

        } catch (error) {
            const err = error as Error
            console.log(error);
            res.status(500).json({message: err.message})
        }
    }
    async employerLogin(req:Request, res: Response){
        try {
            const { email, password } = req.body as IEmployer
            const authData = await this._employerUseCase.verifyLogin(email, password as string)
            res.status(authData.status).json(authData)
        } catch (error) {
            console.log(error);
            // next(error)
        }
    }

    async updateProfile(req:Request,res:Response){
        const userId = req.params.userId;
        const user = req.body as IEmployerUpdate
        const apiRes = await this._employerUseCase.updateUserData(userId,user);
        return res.status(apiRes.status).json(apiRes);
    }

    async getFollowingEmployers(req:Request,res:Response){
        const employerIds = req.body
        const apiRes  = await this._employerUseCase.getFollowingEmployers(employerIds);
        res.status(apiRes.status).json(apiRes);
    }

    async userPlanSubscribe(req:Request,res:Response){
        const {employerId} = req.params
        const {planData}  =req.body
        const apiRes = await this._employerUseCase.updateUserSubscription(employerId,planData);
        return res.status(apiRes.status).json(apiRes);
    }

    async addToWallet(req:Request,res:Response){
        const {employerId} = req.params
        const amount :number = parseInt(req.body.amount);
        const apiRes = await this._employerUseCase.addToWallet(employerId,amount);
        res.status(apiRes.status).json(apiRes);
    }

    async getWalletHistory(req:Request,res:Response){
        const {employerId } = req.params;
        const page = req.query.page as unknown as number
        const limit = req.query.limit as unknown as number
        const apiRes = await this._employerUseCase.getWalletHistory(employerId,page,limit);
        return res.status(apiRes.status).json(apiRes);
    }

    async getEmployerData(req:Request,res:Response){
        const {employerId} = req.params;
        const apiRes = await this._employerUseCase.getEmployerData(employerId);
        return res.status(apiRes.status).json(apiRes);
    }

}