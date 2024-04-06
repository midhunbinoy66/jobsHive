import { IResume } from "../../../entities/resume";

export interface IResumeReq extends Omit<IResume,'_id'>{}

export interface IApiResumeRes {
    status:number
    message:string
    data:IResume|null
}