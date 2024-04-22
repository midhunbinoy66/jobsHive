import { IApiRes, IEmployerAddress, ISubscription, IWalletHistory } from "./common"

export interface IEmployerRes{
    _id:string
    name:string
    email:string
    password:string
    isBlocked:boolean
    profilePic?:string
    mobile?:number
    address?:IEmployerAddress
    subscription?:ISubscription
    wallet?: number
    walletHistory?:IWalletHistory[]| []

}


export interface IEmployerAuth{
    email:string
    password:string
    companyName:string

}


export interface IAPiEmployerRes extends IApiRes<IEmployerRes>{}
export interface IApiEmployersRes extends IApiRes<IEmployerRes[]>{}




export interface IEmployerAuthRes{
    status:number
    message:string
    data:IEmployerRes | null
    accessToken:string
    refreshToken:string
}

export interface IEmployersAndCount{
    users:IEmployerRes[]
    userCount:number
  }

export interface IEmployerUpdate extends Omit<IEmployerRes, '_id' | 'email' | 'password' | 'isBlocked' > { }
