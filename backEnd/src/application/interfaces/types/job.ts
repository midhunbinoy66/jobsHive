
import { IJob } from "../../../entities/job"


export interface IJobReq extends Omit<IJob,'_id'|"isActive">{}


export interface IApiJobsRes{
  status:number
  message:string
  data:IJob[]|null
}

export interface IApiJobRes{
    status:number
    message:string
    data:IJob|null
  }

export  type MongoDBQuery = {
  $or: ({ title: { $regex: RegExp } } | { location: { $regex: RegExp } })[];
  };

export interface IApiCriteria extends MongoDBQuery{
}