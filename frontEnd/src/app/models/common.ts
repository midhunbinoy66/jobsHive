import { IEmployerRes } from "./employer";
import { IUserRes, IUsersAndCount } from "./users";


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

export type AllResTypes = IUserRes | IEmployerRes | IEmployerRes[]|IUserRes[] | IUsersAndCount | null

export interface IApiRes<T extends AllResTypes> {
    status: number
    message: string
    data: T
  }



export interface IUserEducation{
    institution:string
    degree:string
    fieldOfStudy:string
    eduStartDate:Date
    eduEndDate:Date
}

export interface IUserWorkExp{
    companyName:string
    jobTitle:string
    location:string
    workStartDate:Date
    workEndDate:Date
}
