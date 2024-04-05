import { IJob } from "../../../entities/job";
import { IUser } from "../../../entities/user";
import { IUserAuth, IUserRes, IUserSocialAuth, IUserUpdate } from "../types/user";


export interface IuserRepo{
    saveUser(user:IUserAuth | IUserSocialAuth):Promise<IUser>
    findByEmail(email: string): Promise<IUser | null>
    findById(id:string):Promise<IUser|null>
    updateGoogleAuth(id: string, profilePic: string | undefined): Promise<void>
    updateUser(userId:string,user:IUserUpdate):Promise<IUserRes|null>,
    updateUserSavedJobs(userId:string,job:IJob):Promise<IUserRes|null>
}