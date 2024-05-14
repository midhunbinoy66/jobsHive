import { IEmployerRes } from "../application/interfaces/types/employer"
import { IUserRes } from "../application/interfaces/types/user"
import { IPlan } from "./plan"



export interface ITransaction{
    userId?:string | IUserRes
    employerId?:string |IEmployerRes
    planId?: IPlan | string
    amount:number
    date:Date
}

export interface ITransactionReport{
    userId?:IUserRes
    employerId?:IEmployerRes
    planId?: IPlan 
    amount:number
    date:Date
}
