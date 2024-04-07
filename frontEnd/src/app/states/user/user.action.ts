import { createAction, props } from "@ngrx/store";
import { IUserRes } from "../../models/users";

export const fetchUserData = createAction('[user] fetch User Data from Database',props<{userId:string}>())
export const saveUserOnStore = createAction('[user] Save user Data on Store',props<{userDetails:IUserRes}>());
export const deleteUserFromStore = createAction('[user] Delete user data from stroe');