import { IUserAddress } from "./common"

export interface IUserRes {
    _id: string
    name: string
    email: string
    password?: string
    mobile?: number
    isBlocked: boolean
    profilePic?: string
    wallet?: string
    address?:string
  }
  


export interface IUserAuth {
    name: string
    email: string
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
