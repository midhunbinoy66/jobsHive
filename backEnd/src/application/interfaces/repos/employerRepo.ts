import { IUserSubscription } from "../../../entities/common";
import { IEmployer } from "../../../entities/employer";
import { IWalletHistoryAndCount } from "../types/commont";
import { IEmployerAuth, IEmployerRes, IEmployerUpdate} from "../types/employer";


export interface IEmployerRepo{
    saveEmployer(employer:IEmployerAuth):Promise<IEmployer>
    findByEmail(email:string):Promise<IEmployer | null>
    findById(id:string):Promise<IEmployer|null>
    updateUser(userId:string,user:IEmployerUpdate):Promise<IEmployerRes|null>,
    findAllUsers(page:number,limit:number,searchQuery:string):Promise<IEmployerRes[] | null>
    findUsersCount(searchQuery:string):Promise<number>
    blockAndUblockUser(userId:string):Promise<void>
    findFollowingEmployers(employerIds:string[]):Promise<IEmployer[]|null>
    updateUserSubscription(userId:string,planData:IUserSubscription):Promise<IEmployerRes | null>
    updateWallet(userId:string,amount:number,message:string):Promise<IEmployerRes | null>
    getWalletHistory(userId:string,page:number,limit:number):Promise<IWalletHistoryAndCount | null>

}