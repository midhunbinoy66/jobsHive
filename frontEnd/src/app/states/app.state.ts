import * as fromUser from './user/user.reducer';
import * as fromEmployer from './employer/employer.reducer'


export interface RootState{
    user:fromUser.UserState
    employer:fromEmployer.EmployerState

}


export const reducer ={
    user:fromUser.userReducer,
    employer:fromEmployer.employerReducer
}