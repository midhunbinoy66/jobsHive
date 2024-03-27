
import { IUser } from "../../entities/user";
import { OTP_TIMER } from "../../infrastructure/constants/constants";
import { STATUS_CODES } from "../../infrastructure/constants/httpStatusCodes";
import { ITempUserRepo } from "../interfaces/repos/tempUserRepo";
import { IuserRepo } from "../interfaces/repos/userRepo";
import { ITempUserRes, ITempUsrReq } from "../interfaces/types/tempUser";
import { IApiUserAuthRes, IUserAuth } from "../interfaces/types/user";
import { IEncryptor } from "../interfaces/utils/encryptor";
import { ImailSender } from "../interfaces/utils/mailSender";
import { ITokenGenerator } from "../interfaces/utils/tokenGenerator";

export class UserUseCase{
    constructor(
        private readonly _userRespository:IuserRepo,
        private readonly _tempUserRepository:ITempUserRepo,
        private readonly _encryptor:IEncryptor,
        private readonly _tokenGenerator:ITokenGenerator,
        private readonly _mailer:ImailSender
    )
    {}

    async isEmailExist(email:string):Promise<IUser | null>{
        const iUserExist = await this._userRespository.findByEmail(email);
        return iUserExist;
    }

    async saveUserDetails(userData:IUserAuth):Promise<IApiUserAuthRes>{
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
}