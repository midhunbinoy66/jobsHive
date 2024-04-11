

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


export interface  IPlan{
    _id:string
    name:string
    description:string
    price:number
    features:string[]
    duration:string
    isActive:boolean
}

export interface IPlanReq extends Omit<IPlan,'_id'|'isActive'>{}
export interface IPlanUpdate extends Omit<IPlan, '_id'|'isActive'>{}