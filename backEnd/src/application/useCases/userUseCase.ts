
import { IUser } from "../../entities/user";
import { OTP_TIMER } from "../../infrastructure/constants/constants";
import { STATUS_CODES } from "../../infrastructure/constants/httpStatusCodes";
import { IJobRepo } from "../interfaces/repos/jobRepo";
import { ITempUserRepo } from "../interfaces/repos/tempUserRepo";
import { IuserRepo } from "../interfaces/repos/userRepo";
import { IApiResumeRes, IResumeReq } from "../interfaces/types/resume";
import { ITempUserRes, ITempUsrReq } from "../interfaces/types/tempUser";
import { IApiUserAuthRes, IApiUserRes, IUserAuth, IUserSocialAuth, IUserUpdate } from "../interfaces/types/user";
import { IEncryptor } from "../interfaces/utils/encryptor";
import { ImailSender } from "../interfaces/utils/mailSender";
import { ITokenGenerator } from "../interfaces/utils/tokenGenerator";

export class UserUseCase{
    constructor(
        private readonly _userRespository:IuserRepo,
        private readonly _tempUserRepository:ITempUserRepo,
        private readonly _encryptor:IEncryptor,
        private readonly _tokenGenerator:ITokenGenerator,
        private readonly _mailer:ImailSender,
        private readonly _jobRepository:IJobRepo
    )
    {}

    async isEmailExist(email:string):Promise<IUser | null>{
        const iUserExist = await this._userRespository.findByEmail(email);
        return iUserExist;
    }

    async saveUserDetails(userData:IUserAuth | IUserSocialAuth):Promise<IApiUserAuthRes>{
        const user = await this._userRespository.saveUser(userData);
        const accessToken = this._tokenGenerator.generateAccessToken(user._id);
        const refreshToken = this._tokenGenerator.generateRefreshToken(user._id);

        return {
            status: STATUS_CODES.OK,
            data:user,
            message:'success',
            accessToken,
            refreshToken
        }
    }

    async handleSocialSignUp(name:string,email:string,profilePic:string | undefined):Promise<IApiUserAuthRes>{
        const emailData = await this.isEmailExist(email);
        if(emailData === null){
            const userToSave = {name,email,profilePic,isGoogleAuth:true};
            const savedData = await this.saveUserDetails(userToSave);
            return savedData;
        }else{
            if(emailData.isBlocked){
                return {
                    status: STATUS_CODES.FORBIDDEN,
                    message: 'You are blocked by admin',
                    data: null,
                    accessToken: '',
                    refreshToken: ''
                }
            }else{
                if(!emailData.isGoogleAuth){
                    await this._userRespository.updateGoogleAuth(emailData._id,profilePic);
                    
                }

                const accessToken = this._tokenGenerator.generateAccessToken(emailData._id);
                const refreshToken = this._tokenGenerator.generateRefreshToken(emailData._id);
                return{
                    status:STATUS_CODES.OK,
                    message:'Success',
                    data:emailData,
                    accessToken,
                    refreshToken
                }
            }
        }
    }


    async saveUserTemporarily(userData:ITempUsrReq):Promise<ITempUserRes & {userAuthToken:string}>{
        const user = await this._tempUserRepository.saveUser(userData);
        const userAuthToken = this._tokenGenerator.generateTempToken(user._id);
        return {...JSON.parse(JSON.stringify(user)),userAuthToken}
    }

    async updateOtp(id: string, email: string, OTP: number) {
        return await this._tempUserRepository.updateOTP(id, email, OTP)
    }

    async findTempUserById(id: string){
        return await this._tempUserRepository.findById(id)
    }

    sendTimeoutOTP(id: string, email: string, OTP: number) {
        try {
            this._mailer.sendOtp(email, OTP)
                    
            setTimeout(async() => {
                await this._tempUserRepository.unsetOtp(id, email)
            }, OTP_TIMER)

        } catch (error) {
            console.log(error);
            throw Error('Error while sending timeout otp')
        }
    }

    async verifyLogin(email:string,password:string):Promise<IApiUserAuthRes>{
        const userData = await this._userRespository.findByEmail(email);
        if(userData !== null){
            if(userData.isBlocked){
                return {
                    status:STATUS_CODES.FORBIDDEN,
                    message:'You are blocked by admin',
                    data:null,
                    accessToken:'',
                    refreshToken:''
                }
            }else{
                const passwordMatch = await this._encryptor.comparePassword(password,userData.password as string);
                if(passwordMatch){
                    const accessToken = this._tokenGenerator.generateAccessToken(userData._id);
                    const refreshToken = this._tokenGenerator.generateRefreshToken(userData._id);
                        return {
                            status:STATUS_CODES.OK,
                            message:'Success',
                            data:userData,
                            accessToken:accessToken,
                            refreshToken:refreshToken
                        }
                    
                }else{
                    return {
                        status:STATUS_CODES.UNAUTHORIZED,
                        message:'Incorrect credentials',
                        data:null,
                        accessToken:'',
                        refreshToken:''
                    }
                }
            }
        }else{
            return {
                status:STATUS_CODES.UNAUTHORIZED,
                message:'Invalid email or password',
                data:null,
                accessToken:'',
                refreshToken:''
            }
        }

    }

    async updateUserData(userId:string,user:IUserUpdate):Promise<IApiUserRes>{
        try {
            const updatedUser = await this._userRespository.updateUser(userId,user)
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:updatedUser,
            }
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }

    async saveUserJob(userId:string,jobId:string):Promise<IApiUserRes>{

        try {
            const job = await this._jobRepository.findJobById(jobId);
            if(job !== null){
                const updatedUser =await this._userRespository.updateUserSavedJobs(userId,job)
                return {
                    status:STATUS_CODES.OK,
                    message:'Success',
                    data:updatedUser,
                }
            }else{
                return {
                    status:STATUS_CODES.NOT_FOUND,
                    message:'Error,Job not found',
                    data:null,
                }
            }
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }

    }


    async getUserResume(userId:string):Promise<IApiResumeRes>{
        try {
            
            const userResume = await this._userRespository.findResumeByUserId(userId);
            if(userResume !== null){
                return {
                    status:STATUS_CODES.OK,
                    message:'Success',
                    data:userResume,
                }
            }else{
                return {
                    status:STATUS_CODES.NOT_FOUND,
                    message:'No resume for this user',
                    data:userResume,
                }
            }

        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }
    

    async saveUserResume(userId:string,resumeData:IResumeReq):Promise<IApiResumeRes>{
        try {
            const userResume = await this._userRespository.saveUserResume(userId,resumeData);
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:userResume,
            }
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }
}