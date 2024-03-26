import * as fromUser from './user/user.reducer';

export interface RootState{
    user:fromUser.UserState
}


export const reducer ={
    user:fromUser.userReducer
}