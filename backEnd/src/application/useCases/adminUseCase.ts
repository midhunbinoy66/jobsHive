import { STATUS_CODES } from "../../infrastructure/constants/httpStatusCodes";
import { IAdminRepo } from "../interfaces/repos/adminRespo";
import { IApiAdminAuthRes } from "../interfaces/types/admin";
import { IEncryptor } from "../interfaces/utils/encryptor";
import { ITokenGenerator } from "../interfaces/utils/tokenGenerator";

export class AdminUseCase{
    constructor(
        private readonly _encryptor: IEncryptor,
        private readonly _adminRepository:IAdminRepo,
        private readonly _tokenGenerator:ITokenGenerator
    ){}

    async verifyLogin(email:string,password:string):Promise<IApiAdminAuthRes>{
        const adminData = await this._adminRepository.findAdmin();
        if(adminData !== null){
            const passwordMatch = await this._encryptor.comparePassword(password,adminData.password);
            if(passwordMatch){
                const accessToken = this._tokenGenerator.generateAccessToken(adminData._id);
                const refreshToken = this._tokenGenerator.generateRefreshToken(adminData._id);
                return {
                    status:STATUS_CODES.OK,
                    message:'Success',
                    data:adminData,
                    accessToken:accessToken,
                    refreshToken:refreshToken
                }
            }else{
                return{
                    status:STATUS_CODES.UNAUTHORIZED,
                    message:'Invalid email or password',
                    data:null,
                    accessToken:'',
                    refreshToken:''
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

}