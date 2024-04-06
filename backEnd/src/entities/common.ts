export interface IUserAddress {
    country: string
    state: string
    district: string
    city: string
    zip: number
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

export interface IEmployerAddress extends IUserAddress{
    landmark?:string
}

export interface IJobAddress extends IUserAddress{}