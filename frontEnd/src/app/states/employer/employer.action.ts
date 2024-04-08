import { createAction, props } from "@ngrx/store";
import { IEmployerRes } from "src/app/models/employer";


export const saveEmployerOnStore = createAction('[Employer] Save employer Data on the store',props<{employerDetails:IEmployerRes}>());
export const deleteEmployreFromStore = createAction('[Employer] Delete employer Data on Store');