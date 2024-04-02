import { IUserAddress } from "./common"

export interface IUser {
    _id: string
    name: string
    email: string
    password?: string
    mobile?: number
    isBlocked: boolean
    profilePic?: string
    address?: IUserAddress,
    isGoogleAuth: boolean
}