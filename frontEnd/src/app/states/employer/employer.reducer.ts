import { createReducer, on } from "@ngrx/store";
import { IEmployerRes } from "src/app/models/employer";
import { deleteEmployreFromStore, saveEmployerOnStore } from "./employer.action";




export interface EmployerState{
    employerDetails:IEmployerRes | null
}

export const initialEmployerState:EmployerState ={
    employerDetails:null
}


export const employerReducer = createReducer(
    initialEmployerState,
    on(saveEmployerOnStore,(state,{employerDetails})=>{
        return {...state,employerDetails}
    }),
    on(deleteEmployreFromStore,(state)=>{
        return {...state,employerDetails:null}
    })
)