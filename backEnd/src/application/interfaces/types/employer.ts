

import { IEmployer } from "../../../entities/employer"


export interface IEmployerRes extends IEmployer{}

export interface IEmployerAuth{
    name:string
    email:string
    password:string
    mobile?:string
}

export interface IApiEmployerAuthRes extends IApiEmployerRes{
    accessToken:string
    refreshToken:string
}

export interface IApiEmployerRes{
    status:number
    message:string
    data:IEmployerRes|null
}
