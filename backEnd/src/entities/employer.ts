import { IEmployerAddress, IUserSubscription } from "./common"


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
} 