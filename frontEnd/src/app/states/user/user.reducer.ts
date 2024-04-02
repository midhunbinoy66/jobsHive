import { createReducer, on } from "@ngrx/store";
import { IUserRes } from "../../models/users";
import { deleteUserFromStore, saveUserOnStore } from "./user.action";


export interface UserState{
    userDetails:IUserRes|null;
}


export const initialUserState:UserState ={
    userDetails:null
}

export const userReducer = createReducer(
    initialUserState,
    on(saveUserOnStore,(state,{userDetails})=>{
        return {...state,userDetails}
    }),
    on(deleteUserFromStore,(state)=>{
        return{...state,userDetails:null}
    })
)