import { IEmployerAddress, IUserSubscription, IWalletHistory } from "./common"


export interface IEmployer{
    _id:string
    name:string
    email:string
    password:string
    address?:IEmployerAddress
    profilePic?:string
    mobile?: number
    isBlocked: boolean
    subscription:IUserSubscription
    wallet:number
    walletHistory:IWalletHistory[],
    subscriptionChangeQueue:string[]
} 