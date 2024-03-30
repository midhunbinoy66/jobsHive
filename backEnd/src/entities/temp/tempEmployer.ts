import { IEmployerAddress } from "../common";

export interface ITempEmployer{
    _id:string
    name:string
    email:string
    otp:number;
    password:string;
    expireAt:Date,
    address?:IEmployerAddress
}