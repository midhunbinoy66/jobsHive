import { IApiRes } from "./commont"



export interface IChatMessage{
    sender:'User'|'Admin'|'Employer'
    message:string
    time:Date
    isRead:boolean
}


export interface IChatHistory{
    userId?:string
    employerId?:string
    adminId?:string
    messages:Array<IChatMessage>
}

export interface IChatReqs extends Omit<IChatHistory,'message'>,Omit<IChatMessage,'time'| 'isRead'>{}
export interface IChatRes extends IChatHistory{}
export interface IApiChatRes extends IApiRes<IChatRes | null>{}

export interface IUserListForChats{
    _id:string
    name:string
    profilePic?:string
    unreadCount:number
}


export interface IChatReadReqs{
    userId:string | undefined
    employerId:string | undefined
    adminId:string | undefined
    msgId:string
}