import { IJobRepo } from "../../application/interfaces/repos/jobRepo";
import {  IJobReq } from "../../application/interfaces/types/job";
import { IJob } from "../../entities/job";
import jobModel from "../db/jobModel";

export class JobRepository implements IJobRepo{

    async saveJobDetails(job: IJobReq): Promise<IJob | null> {
        return await new jobModel(job).save();
    }

   async findJobById(id: string): Promise<IJob | null> {
        return await jobModel.findById({_id:id});
    }

   async findJobs(title:string,location:string): Promise<IJob[] | null> {
    const query = {
        title: new RegExp(title, 'i'), // 'i' flag for case-insensitive matching
        $or: [
            { 'location.country': new RegExp(location, 'i') },
            { 'location.state': new RegExp(location, 'i') },
            { 'location.district': new RegExp(location, 'i') },
            { 'location.city': new RegExp(location, 'i') },
            { 'location.zip': parseInt(location) || 0 } 
        ]
    };
        return jobModel.find(query);
    }

    async findSavedJobs(jobIds: string[]): Promise<IJob[] | null> {
        return await jobModel.find({_id:{$in:jobIds}});
    }

    async findAppliedJobs(jobIds: string[]): Promise<IJob[] | null> {
        return await jobModel.find({_id:{$in:jobIds}})
    }

    async deleteEmployerJob(jobId: string): Promise<IJob | null> {
        return await jobModel.findByIdAndUpdate(
            {_id:jobId},
            {
                isActive:false
            },
            {new:true}
        )
    }

    async findEmployerJObs(employerId: string): Promise<IJob[] | null> {
        return await jobModel.find(
            {isActive:true,employer:employerId}
        )
    }

}