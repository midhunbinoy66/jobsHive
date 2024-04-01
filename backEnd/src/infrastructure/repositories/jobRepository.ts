import { IJobRepo } from "../../application/interfaces/repos/jobRepo";
import { IApiCriteria, IJobReq } from "../../application/interfaces/types/job";
import { IJob } from "../../entities/job";
import jobModel from "../db/jobModel";

export class JobRepository implements IJobRepo{

    async saveJobDetails(job: IJobReq): Promise<IJob | null> {
        return await new jobModel(job).save();
    }

   async findJobById(id: string): Promise<IJob | null> {
        return await jobModel.findById({_id:id});
    }

   async findJobs(criteria: IApiCriteria): Promise<IJob[] | null> {
        return jobModel.find(criteria);
    }
}