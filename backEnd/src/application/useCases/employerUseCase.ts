import { IUserSubscription } from "../../entities/common";
import { IEmployer } from "../../entities/employer";
import { OTP_TIMER } from "../../infrastructure/constants/constants";
import { STATUS_CODES } from "../../infrastructure/constants/httpStatusCodes";
import { IEmployerRepo } from "../interfaces/repos/employerRepo";
import { ITempEmployerRepo } from "../interfaces/repos/tempEmployerRepo";
import { IApiRes, IWalletHistoryAndCount } from "../interfaces/types/commont";
import { IApiEmployerAuthRes, IApiEmployerRes, IEmployerAndCount, IEmployerAuth, IEmployerUpdate} from "../interfaces/types/employer";
import { ITempEmployerReq, ITempEmployerRes } from "../interfaces/types/tempEmployer";
import { IEncryptor } from "../interfaces/utils/encryptor";
import { ImailSender } from "../interfaces/utils/mailSender";
import { IOTPGenerator } from "../interfaces/utils/otpGeneratot";
import { ITokenGenerator } from "../interfaces/utils/tokenGenerator";


export class EmployeruseCase{
    constructor(
        private readonly _employerRepository:IEmployerRepo,
        private readonly _tempEmployerRepostiory:ITempEmployerRepo,
        private readonly _encryptor:IEncryptor,
        private readonly _tokenGenerator:ITokenGenerator,
        private readonly _mailer:ImailSender,
        private readonly _otpGenerator:IOTPGenerator
    ){}

    async isEmailExist(email:string):Promise<IEmployer | null>{
        const isEmployerExist = await this._employerRepository.findByEmail(email);
        return isEmployerExist;
    }


    async saveEmployerDetails(employerData:IEmployerAuth):Promise<IApiEmployerAuthRes>{
        const employer = await this._employerRepository.saveEmployer(employerData);
        const accessToken =  this._tokenGenerator.generateAccessToken(employer._id);
        const refreshToken = this._tokenGenerator.generateRefreshToken(employer._id);
        return {
            status:STATUS_CODES.OK,
            data:employer,
            message:'Success',
            accessToken,
            refreshToken
        }
    }

    async  saveEmployerTemporarily(employerData:ITempEmployerReq):Promise<ITempEmployerRes & { userAuthToken: string}>{
        const employer = await this._tempEmployerRepostiory.saveEmployer(employerData);
        const userAuthToken = this._tokenGenerator.generateAccessToken(employer._id);
        return { ...JSON.parse(JSON.stringify(employer)),userAuthToken};
    }

    async updateOtp(id:string,email:string,OTP:number){
        return  await this._tempEmployerRepostiory.updateEmployerOTP(id,email,OTP);

    }


    async findTempEmployerById(id:string){
        return await this._tempEmployerRepostiory.findTempEmployerById(id);
    }


       // To send an otp to user that will expire after a certain period
    sendTimeoutOTP(id: string, email: string, OTP: number) {
        try {
            this._mailer.sendOtp(email, OTP)
                    
            setTimeout(async() => {
                await this._tempEmployerRepostiory.unsetEmployerOTP(id, email)
            }, OTP_TIMER)

        } catch (error) {
            console.log(error);
            throw Error('Error while sending timeout otp')
        }
    }

    async verifyLogin(email:string,password:string):Promise<IApiEmployerAuthRes>{
        const employerData = await this._employerRepository.findByEmail(email);
        if(employerData !== null){
            if(employerData.isBlocked){
                return{
                    status:STATUS_CODES.FORBIDDEN,
                    message:'You are blocked by admin',
                    data:null,
                    accessToken:'',
                    refreshToken:''
                }
            }else{
                const passwordMatch = await this._encryptor.comparePassword(password,employerData.password);
                if(passwordMatch){
                    const accessToken = this._tokenGenerator.generateAccessToken(employerData._id);
                    const refreshToken = this._tokenGenerator.generateRefreshToken(employerData._id);
                    return{
                        status:STATUS_CODES.OK,
                        message:'Success',
                        data:employerData,
                        accessToken,
                        refreshToken
                    }
                }else{
                    return {
                        status: STATUS_CODES.UNAUTHORIZED,
                        message: 'Invalid credentials',
                        data: null,
                        accessToken: '',
                        refreshToken: ''
                    }
                }
            }
        }

        return {
            status: STATUS_CODES.UNAUTHORIZED,
            message: 'Invalid email or password!',
            data: null,
            accessToken: '',
            refreshToken: ''
        };
    }


    async getAllUser(page:number,limit:number,searchQuery:string | undefined):Promise<IApiRes< IEmployerAndCount | null>>{
        try {
            
            if( isNaN(page)) page =1
            if(isNaN(limit)) limit =10;
            if(!searchQuery) searchQuery ='';
            const users = await this._employerRepository.findAllUsers(page,limit,searchQuery);
            const userCount = await this._employerRepository.findUsersCount(searchQuery);
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:{users:users,userCount}
            }
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }

    async blockUser(userId:string):Promise<IApiRes<null>>{
        try {
            await this._employerRepository.blockAndUblockUser(userId);
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:null
            }
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }


    async updateUserData(userId:string,user:IEmployerUpdate):Promise<IApiEmployerRes>{
        try {
            const updatedUser = await this._employerRepository.updateUser(userId,user)
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

    async getFollowingEmployers(employerIds:string[]){
        try {
            const employers = await this._employerRepository.findFollowingEmployers(employerIds);
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:employers,
            }
            
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }

    async updateUserSubscription(userId:string,planData:IUserSubscription):Promise<IApiEmployerRes>{
        try {
            const userData = await this._employerRepository.updateUserSubscription(userId,planData)
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:userData
            }

        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:"Internal Sever Error",
                data:null
            }
        }
    }


    async addToWallet(userId:string,amount:number):Promise<IApiEmployerRes>{
        try {
            if(typeof amount !== 'number'){
                return {
                    status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                    message:"Internal Sever Error",
                    data:null
                }
            }else{
                const user = await this._employerRepository.updateWallet(userId,amount,'Add to Wallet');
                if (user !== null){
                    return{
                        status:STATUS_CODES.OK,
                        message:'Success',
                        data:user
                    }
                }else{
                    return{
                        status:STATUS_CODES.BAD_REQUEST,
                        message:'Bad Request',
                        data:null
                    }
                } 

            }
            
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:"Internal Sever Error",
                data:null
            }
        }
    }


    async getWalletHistory(userId:string,page:number,limit:number):Promise<IApiRes<IWalletHistoryAndCount| null>>{
        try {
                const userWallet = await this._employerRepository.getWalletHistory(userId,page,limit)
                if(userWallet){
                    return {
                        status:STATUS_CODES.OK,
                        message:'Success',
                        data:userWallet
                    }
                }
                else{
                    return {
                        status:STATUS_CODES.BAD_REQUEST,
                        message:'Error',
                        data:null
                    }
                }
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:"Internal Sever Error",
                data:null
            }
        }
    }

}