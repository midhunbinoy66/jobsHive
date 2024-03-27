import { IUser } from "../../../entities/user";
import { IUserAuth } from "../types/user";


export interface IuserRepo{
    saveUser(user:IUserAuth):Promise<IUser>
    findByEmail(email: string): Promise<IUser | null>
    findById(id:string):Promise<IUser|null>
}