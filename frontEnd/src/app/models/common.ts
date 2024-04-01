

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