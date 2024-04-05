import { IJobAddress } from "./common"

export interface IApiJobsRes{
    status:string
    message:string
    data:IJobRes[]|null
  }


export interface IJobRes{
    _id:string
    employer:string
    title:string
    description:string
    salary:number
    isActive:boolean
    location:string
    type:string
    tags:string[]
    requirements:string[]
    responsibilities:string[]
}