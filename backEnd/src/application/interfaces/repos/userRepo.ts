import { IJob } from "../../../entities/job";
import { IResume } from "../../../entities/resume";
import { IUser } from "../../../entities/user";
import { IResumeReq } from "../types/resume";
import { IUserAuth, IUserRes, IUserSocialAuth, IUserUpdate } from "../types/user";


export interface IuserRepo{
    saveUser(user:IUserAuth | IUserSocialAuth):Promise<IUser>
    findByEmail(email: string): Promise<IUser | null>
    findById(id:string):Promise<IUser|null>
    updateGoogleAuth(id: string, profilePic: string | undefined): Promise<void>
    updateUser(userId:string,user:IUserUpdate):Promise<IUserRes|null>,
    updateUserSavedJobs(userId:string,job:IJob):Promise<IUserRes|null>,
    findResumeByUserId(userId:string):Promise<IResume|null>,
    saveUserResume(userId:string,resume:IResumeReq):Promise<IResume|null>
    removeUserSavedJob(userId:string,jobId:string):Promise<IUserRes| null>
    findAllUsers(page:number,limit:number,searchQuery:string):Promise<IUserRes[] | null>
    findUsersCount(searchQuery:string):Promise<number>
    blockAndUblockUser(userId:string):Promise<void>
}