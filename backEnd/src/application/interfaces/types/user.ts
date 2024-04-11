import { IUser } from "../../../entities/user"

//authentication credentials
export interface IUserAuth {
    name: string
    email: string
    mobile:string
    password: string
}

// for social auth credentials
export interface IUserSocialAuth {
    name: string
    email: string
    profilePic?: string
}

export interface IUserRes extends IUser{}


export interface IApiUserRes {
    status: number
    message: string
    data: IUserRes | null
}


export interface IApiUserAuthRes extends IApiUserRes{
    accessToken:string
    refreshToken:string
}

export interface  IUserAndCount{
    users:IUserRes[] | null,
    userCount:number
}

export interface IUserUpdate extends Omit<IUserRes,'_id'|'password'|'email'|'isBlocked'>{}