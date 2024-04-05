import { IApplicantRepo } from "../../application/interfaces/repos/applicatnRepo";
import { IApplicationReq } from "../../application/interfaces/types/application";
import { IApplication } from "../../entities/application";
import applicationModel from "../db/applicaitonModel";

export class ApplicationRepository implements IApplicantRepo{
    async findAllApplication(userId: string): Promise<IApplication[] | null> {
        return await applicationModel.find({userId:userId});
    }

    async findApplicaitonById(applicationId: string): Promise<IApplication | null> {
        return await applicationModel.findById(applicationId);
    }

    async saveApplication(applicationData:IApplicationReq): Promise<IApplication | null> {
        return await new applicationModel(applicationData).save() 
    }
}