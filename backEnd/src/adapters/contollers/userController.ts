import { Request, Response } from "express";
import { UserUseCase } from "../../application/useCases/userUseCase";
import { Encryptor } from "../../infrastructure/utils/bcryptPassword";
import { OTPGenerator } from "../../infrastructure/utils/otpGenerator";
import { IUserAuth, IUserSocialAuth, IUserUpdate } from "../../application/interfaces/types/user";
import { ITempUsrReq } from "../../application/interfaces/types/tempUser";
import { STATUS_CODES } from "../../infrastructure/constants/httpStatusCodes";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { IUser } from "../../entities/user";

export class UserController{
    constructor(
        private readonly _userUseCAse:UserUseCase,
        private readonly otpGenerator:OTPGenerator,
        private readonly ecrypt:Encryptor
    )
    {}

    async userRegister(req:Request,res:Response){
        try {
            const {name,email,password,mobile} = req.body as IUserAuth;
            const isEmailExist = await this._userUseCAse.isEmailExist(email);
            if(isEmailExist === null){
                const OTP = this.otpGenerator.genrateOTP();

                const securePassword = await this.ecrypt.encryptPassword(password);
                const user:ITempUsrReq ={name,email,password:securePassword,otp:OTP,mobile:mobile}
                const tempUser = await this._userUseCAse.saveUserTemporarily(user);

                this._userUseCAse.sendTimeoutOTP(tempUser._id,tempUser.email,OTP);
                res.status(STATUS_CODES.OK).json({message:'Success',token:tempUser.userAuthToken})
            }else{
                res.status(STATUS_CODES.FORBIDDEN).json({message: "Email already Exist"});
            }
        
        } catch (error) {
            console.log(error);
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
                const user = await this._userUseCAse.findTempUserById(decoded.id)
                if(user){
                    if(otp == user.otp){
                        const savedData = await this._userUseCAse.saveUserDetails({
                            name: user.name,
                            email: user.email,
                            password: user.password,
                            mobile:user.mobile
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
                const tempUser = await this._userUseCAse.findTempUserById(decoded.id)
                if(tempUser){
                    const OTP = this.otpGenerator.genrateOTP()
                    // console.log(tempUser, 'userData');
                    console.log(OTP, 'new resend otp');
                    await this._userUseCAse.updateOtp(tempUser._id, tempUser.email, OTP)
                    this._userUseCAse.sendTimeoutOTP(tempUser._id, tempUser.email, OTP)
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


    async userLogin(req:Request,res:Response){
        try {
            console.log('user login hit')
            const {email,password} = req.body as IUser;
            const authData = await this._userUseCAse.verifyLogin(email,password as string);
            res.status(authData.status).json(authData);
    
        } catch (error) {
            console.log(error);
        }

        
    }

    async userSocialSignUp(req:Request,res:Response){
        try {
            const {name,email,profilePic} = req.body as IUserSocialAuth;
            const authData = await this._userUseCAse.handleSocialSignUp(name,email,profilePic as string);
            res.status(authData.status).json(authData);
        } catch (error) {
            const err = error as Error
            res.status(500).json({message: err.message })
        }
    }


    async updateProfile(req:Request,res:Response){
        const userId = req.params.userId;
        const user = req.body as IUserUpdate
        const apiRes = await this._userUseCAse.updateUserData(userId,user);
        return res.status(apiRes.status).json(apiRes);
    }

}