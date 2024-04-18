import { IUserAddress, IUserSubscription, IWalletHistory } from "./common"

export interface IUser {
    _id: string
    name: string
    email: string
    password?: string
    mobile?: number
    isBlocked: boolean
    profilePic?: string
    address?: IUserAddress,
    isGoogleAuth: boolean,
    savedJobs?:string[],
    following?:string[],
    wallet:number
    walletHistory:IWalletHistory[]
    subscription?:IUserSubscription
}