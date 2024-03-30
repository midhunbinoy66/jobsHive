import { ITempEmployerReq, ITempEmployerRes } from "../types/tempEmployer";

export interface ITempEmployerRepo{
    saveEmployer(employer:ITempEmployerReq):Promise<ITempEmployerRes>
    unsetEmployerOTP(id:string,email:string):Promise<ITempEmployerRes|null>
    findTempEmployerById(id:string):Promise<ITempEmployerRes|null>
    updateEmployerOTP(id:string,email:string,OTP:number):Promise<ITempEmployerRes|null>
}