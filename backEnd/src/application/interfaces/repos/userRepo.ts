import { IUserSubscription } from "../../../entities/common";
import { IJob } from "../../../entities/job";
import { IResume } from "../../../entities/resume";
import { IUser } from "../../../entities/user";
import { IWalletHistoryAndCount } from "../types/commont";
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
    followEmployer(userId:string,employerId:string):Promise<IUserRes | null>
    unFollowEmplopyer(userId:string,employerId:string):Promise<IUserRes | null>
    updateWallet(userId:string,amount:number,message:string):Promise<IUserRes | null>
    getWalletHistory(userId:string,page:number,limit:number):Promise<IWalletHistoryAndCount | null>
    updateUserSubscription(userId:string,planData:IUserSubscription):Promise<IUserRes | null>
    updateUserProfilePic(userId: string, fileName: string): Promise<IUserRes | null>
    removeUserProfileDp(userId: string): Promise<IUserRes | null>,
    updateResumePath(userId:string,fileName:string):Promise<IUserRes | null>
}