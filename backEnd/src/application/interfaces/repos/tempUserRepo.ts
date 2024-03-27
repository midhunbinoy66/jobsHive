import { ITempUserRes, ITempUsrReq } from "../types/tempUser";


export interface ITempUserRepo{
    saveUser(user:ITempUsrReq):Promise<ITempUserRes>
    findByEmail(email:string):Promise<ITempUserRes|null>
    findById(id:string):Promise<ITempUserRes|null>
    unsetOtp(id:string,email:string): Promise<ITempUserRes|null>
    updateOTP(id:string,email:string,OTP:number):Promise<ITempUserRes|null>
}