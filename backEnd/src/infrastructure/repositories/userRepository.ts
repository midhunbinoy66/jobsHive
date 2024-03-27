import { IuserRepo } from "../../application/interfaces/repos/userRepo";
import { IUserAuth } from "../../application/interfaces/types/user";
import { IUser } from "../../entities/user";
import userModel from "../db/userModel";


export class UserRespository implements IuserRepo {
        
       async saveUser(user: IUserAuth): Promise<IUser> {
        return await new userModel(user).save();
        }

        async  findByEmail(email: string): Promise<IUser | null> {
                return await userModel.findOne({ email })
        }
}