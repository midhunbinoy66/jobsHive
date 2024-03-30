import { IEmployer } from "../../../entities/employer";
import { IEmployerAuth} from "../types/employer";


export interface IEmployerRepo{
    saveEmployer(employer:IEmployerAuth):Promise<IEmployer>
    findByEmail(email:string):Promise<IEmployer | null>
    findById(id:string):Promise<IEmployer|null>
}