import { IJobAddress } from "./common"
import { IEmployer } from "./employer"


export interface IJob{
    _id:string
    employer:IEmployer
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