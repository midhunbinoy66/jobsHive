import { IUserRes } from "./users";


export interface IUserAddress{
    country:string;
    state:string;
    district:string;
    city:string;
    zip:string;
}

export interface ISubscription{
    planId:string;
    startDate:Date;
    endDate:Date;
}



export interface IEmployerAddress extends IUserAddress{
    landmark?:string
}

export interface IJobAddress extends IUserAddress{}

export type AllResTypes = IUserRes 

export interface IApiRes<T extends AllResTypes> {
    status: number
    message: string
    data: T
  }



export interface IUserEducation{
    institution:string
    degree:string
    fieldOfStudy:string
    eduStartDate:string
    eduEndDate:string
}

export interface IUserWorkExp{
    companyName:string
    jobTitle:string
    location:string
    workStartDate:string
    workEndDate:string
}
