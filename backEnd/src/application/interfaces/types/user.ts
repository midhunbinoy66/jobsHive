import { IUser } from "../../../entities/user"

//authentication credentials
export interface IUserAuth {
    name: string
    email: string
    mobile:string
    password: string
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