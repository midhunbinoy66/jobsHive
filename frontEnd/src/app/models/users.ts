import { IApiRes, ISubscription, IUserAddress } from "./common"

export interface IUserRes {
    _id: string
    name: string
    email: string
    password?: string
    mobile?: number
    isBlocked: boolean
    profilePic?: string
    wallet?: string
    address?:IUserAddress
    savedJobs?:string[]
    subscription?:ISubscription
    following?:string[]
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


export interface IUserSubscriptionDisplay{
  startDate:Date
  endDate:Date
  planName:string
  features:string[]
  description:string
}

export interface IUsersAndCount{
  users:IUserRes[]
  userCount:number
}

export interface IUserUpdate extends Omit<IUserRes, '_id' | 'email' | 'password' | 'isBlocked' > { }
export interface IApiUserRes extends IApiRes<IUserRes> {}
export interface IApiUsersRes extends IApiRes<IUserRes[]>{}