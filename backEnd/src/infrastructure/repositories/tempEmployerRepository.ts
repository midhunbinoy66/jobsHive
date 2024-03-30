import { ITempEmployerRepo } from "../../application/interfaces/repos/tempEmployerRepo";
import { ITempEmployerReq, ITempEmployerRes } from "../../application/interfaces/types/tempEmployer";
import { tempEmployerModel } from "../db/temp/tmepEmployerModel";

export class TempEmployerRepository implements ITempEmployerRepo{
    async saveEmployer(employer: ITempEmployerReq): Promise<ITempEmployerRes> {
        return await tempEmployerModel.findOneAndUpdate(
            {email:employer.email},
            {
                $set:{
                    name:employer.name,
                    email:employer.email,
                    otp:employer.otp,
                    password:employer.password,
                    expireAt:Date.now(),
                    address:employer.address
                }
            },
            {upsert:true,new:true,setDefaultsOnInsert:true}
        )
    }

    async unsetEmployerOTP(id: string, email: string): Promise<ITempEmployerRes | null> {
        return await tempEmployerModel.findOneAndUpdate(
            {_id:id,email},
            {$unset:{otp:1}},
            {new:true}
        )
    }

    async findTempEmployerById(id: string): Promise<ITempEmployerRes | null> {
        return await tempEmployerModel.findById({_id:id});   
    }

    async updateEmployerOTP(id: string, email: string, OTP: number): Promise<ITempEmployerRes | null> {
        return tempEmployerModel.findByIdAndUpdate(
            {_id:id,email},
            {
                $set:{otp:OTP}
            },
            {new:true}
        )
    }
}