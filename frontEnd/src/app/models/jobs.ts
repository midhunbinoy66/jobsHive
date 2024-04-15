import { IJobAddress } from "./common"

export interface IApiJobsRes{
    status:string
    message:string
    data:IJobRes[]|null
  }


export interface IApiJobRes{
    status:string
    message:string
    data:IJobRes|null
  }


export interface IJobRes{
    _id:string
    employer:string
    title:string
    description:string
    salary:number
    isActive:boolean
    location:IJobAddress
    type:string
    requierments:string[]
    responsibilities:string[]
}


export interface IJobReq extends Omit<IJobRes ,'_id'|'isActive'|'tags'>{}