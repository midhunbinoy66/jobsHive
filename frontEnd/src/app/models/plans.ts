

export interface IApiPlanRes{
    status:number
    message:string
    data:IPlan | null

}


export interface IApiPlansRes{
    status:number
    message:string
    data:IPlan[] | null

}


export interface IPlanAndCount{
    plans:IPlan[] | null
    planCount:number
}

export interface IApiPlanAndCountRes{
    status:number
    message:string
    data:IPlanAndCount | null
}

export interface  IPlan{
    _id:string
    name:string
    description:string
    price:number
    features:string[]
    duration:number
    isActive:boolean
    type:string 
}

export interface IPlanReq extends Omit<IPlan,'_id'|'isActive'>{}
export interface IPlanUpdate extends Omit<IPlan, '_id'|'isActive'>{}