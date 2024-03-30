import { IEmployerRepo } from "../../application/interfaces/repos/employerRepo";
import { IEmployerAuth } from "../../application/interfaces/types/employer";
import { IEmployer } from "../../entities/employer";
import { employerModel } from "../db/employerModel";



export class EmployerRepository implements IEmployerRepo{
    async saveEmployer(employer: IEmployerAuth): Promise<IEmployer> {
        return await new employerModel(employer).save();
    }

    async findByEmail(email: string): Promise<IEmployer | null> {
        return await employerModel.findOne({email});
    }

    async findById(id: string): Promise<IEmployer | null> {
        return await employerModel.findById({_id:id});
    }


}