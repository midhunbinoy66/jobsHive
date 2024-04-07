

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
}