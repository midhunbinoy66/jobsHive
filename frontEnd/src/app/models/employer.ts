import { IApiRes, IEmployerAddress, ISubscription } from "./common"

export interface IEmployerRes{
    _id:string
    email:string
    companyName:string
    password:string
    profilePic?:string
    numberOfEmployees?:number
    isBlocked:boolean
    mobile?:number
    address?:IEmployerAddress
    subscription?:ISubscription
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

