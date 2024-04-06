import { IUserEducation, IUserWorkExp } from "./common"
import { IUser } from "./user"

export interface IResume{
    _id:string
    userId:IUser
    name:string
    mobile:string
    email:string
    languages:string[]
    skills:string[]
    workExperience:IUserWorkExp
    education:IUserEducation
}