import { IJobAddress } from "./common"
import { IEmployerRes } from "./employer"

export interface IApiJobsRes{
    status:string
    message:string
    data:IJobRes[]|null
  }

export interface IJobsAndCount{
  jobs:IJobRes[],
  jobCount:number
}

export interface IApiJobsAndCountRes{
  status:string
  message:string
  data:IJobsAndCount | null
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
    verification:string
}



export interface IJobssAndCount{
  jobs:IJobRes[]
  jobsCount:number
}
export interface IJobReq extends Omit<IJobRes ,'_id'|'isActive'|'tags'|'verification'>{}