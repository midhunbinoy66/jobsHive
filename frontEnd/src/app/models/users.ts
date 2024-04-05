import { IApiRes, IUserAddress } from "./common"

export interface IUserRes {
    _id: string
    name: string
    email: string
    password?: string
    mobile?: number
    isBlocked: boolean
    profilePic?: string
    wallet?: string
    address?:IUserAddress,
    savedJobs?:string[]
  }
  


export interface IUserAuth {
    name: string
    email: string,
    mobile?:number
    password: string
  }

export interface IApiUserAuthRes {
    status: number
    message: string
    data: IUserRes | null
    accessToken: string
    refreshToken: string
}

export interface IApiTokenRes {
  status: number
  message: string
  accessToken: string
}



export interface IUserSocialAuth {
  name: string
  email: string
  profilePic?: string
}

export interface IUserUpdate extends Omit<IUserRes, '_id' | 'email' | 'password' | 'isBlocked' > { }
export interface IApiUserRes extends IApiRes<IUserRes> {}