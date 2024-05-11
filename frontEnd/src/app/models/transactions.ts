import { IEmployerRes } from "./employer"
import { IUserRes } from "./users"

export interface ITransactionPopulated{
    _id:string
    amount:number
    userId?:IUserRes
    employerId?:IEmployerRes
    date:Date
}