
export interface IadminRes{
    email:string
}

export interface IApiAdminRes{
    status:number
    message:string
    data:IadminRes|null
    token:string
}


export interface IApiAdminAuthRes{
    status:number
    message:string
    data:IadminRes | null
    accessToken:string
    refreshToken:string
}