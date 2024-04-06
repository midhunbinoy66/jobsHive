import { IUserEducation, IUserWorkExp } from "./common"

export interface IResumeRes{
    _id:string
    userId:string
    name:string
    mobile:string
    email:string
    languages:string[]
    skills:string[]
    workExperience:IUserWorkExp
    education:IUserEducation
}

export interface IApiResumeRes{
    status:string
    message:string
    data:IResumeRes|null
  }
 
  
export interface IResumeUpdate extends Omit<IResumeRes,'_id'|'userId'>{}