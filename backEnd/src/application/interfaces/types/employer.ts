

import { IApplication } from "../../../entities/application"
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

export interface  IEmployerAndCount{
    users:IEmployerRes[] | null,
    userCount:number
}

export interface IEmployerUpdate extends Omit<IEmployerRes,'_id'|'password'|'email'|'isBlocked'>{}

export interface IEmployerDashboardData{
    totalJobs:number,
    totalApplicants:number,
    recentApplications:IApplication[]
}
