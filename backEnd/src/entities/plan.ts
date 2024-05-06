

export interface IPlan{
    _id:string
    duration:number
    price:number
    name:string
    description:string
    features:IPlanFeatures
    isActive:boolean
    type:string
}

export interface IPlanFeatures{
    jobApplications:number
    unlimitedSearch:boolean
    chatFacility:boolean
}