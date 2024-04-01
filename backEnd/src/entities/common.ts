export interface IUserAddress {
    country: string
    state: string
    district: string
    city: string
    zip: number
}

export interface IEmployerAddress extends IUserAddress{
    landmark?:string
}

export interface IJobAddress extends IUserAddress{}