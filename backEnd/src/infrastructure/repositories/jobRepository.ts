
import { IJobRepo } from "../../application/interfaces/repos/jobRepo";
import { IJobAndCount, IJobReq } from "../../application/interfaces/types/job";
import { IJob } from "../../entities/job";
import jobModel from "../db/jobModel";

export class JobRepository implements IJobRepo{

    async saveJobDetails(job: IJobReq): Promise<IJob | null> {
        return await new jobModel(job).save();
  
    }

   async findJobById(id: string): Promise<IJob | null> {
        return await jobModel.findById({_id:id});
    }

   async findJobs(title:string,location:string,pageNumber:number,pageSize:number): Promise<IJobAndCount | null> {
    const query = {
        title: new RegExp(title, 'i'), // 'i' flag for case-insensitive matching
        isActive:true,
        $or: [
            { 'location.country': new RegExp(location, 'i') },
            { 'location.state': new RegExp(location, 'i') },
            { 'location.district': new RegExp(location, 'i') },
            { 'location.city': new RegExp(location, 'i') },
            { 'location.zip': parseInt(location) || 0 } 
        ]
    }
        const skip = (pageNumber-1)*pageSize
        const jobs = await jobModel.find(query)
        .skip(skip)
        .limit(pageSize)
        .exec()

        const jobsCount = await jobModel.countDocuments(query);

        return {
            jobs,
            jobCount:jobsCount
        }
    }

    async findSavedJobs(jobIds: string[],pageNumber:number,pageSize:number): Promise<IJobAndCount | null> {
        const skip = (pageNumber-1)*pageSize
        const savedJobs = await jobModel.find({_id:{$in:jobIds}})
        .skip(skip)
        .limit(pageSize)
        .populate('employer')
        .exec()

        const savedJobsCount = await jobModel.countDocuments({_id:{$in:jobIds}});

        return {
            jobs:savedJobs,
            jobCount:savedJobsCount
        }
    }


    async findJobsBySkill(skills:string[],pageNumber:number,pageSize:number):Promise<IJobAndCount | null>{
        const skip = (pageNumber-1)*pageSize
        const jobs = await jobModel.find({
            skills:{$in:skills}
        }).skip(skip).limit(pageSize).exec()

        const JobsCount = await jobModel.countDocuments({
            skills:{$in:skills}
        })
        return {
            jobs:jobs,
            jobCount:JobsCount
        }
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

    async findEmployerJObs(employerId: string,page:number,pageSize:number): Promise<{ jobs: IJob[]; jobCount: number } | null> {
        const skip = (page - 1) * pageSize;
        const jobs = await jobModel.find(
            {isActive:true,employer:employerId}
        ).skip(skip)
        .limit(pageSize)
        .exec()

        const jobCount = await jobModel.countDocuments({isActive:true,employer:employerId});

        return {
            jobs,
            jobCount
        }
    }

    async updateJob(jobId: string, jobData: IJobReq): Promise<IJob | null> {
        return await jobModel.findByIdAndUpdate(
            {_id:jobId},
            {
                $set:{
                    title:jobData.title,
                    description:jobData.description,
                    salary:jobData.salary,
                    type:jobData.type,
                    requierments:jobData.requierments,
                    responsibilities:jobData.responsibilities,
                    location:jobData.location,
                    skills:jobData.skills
                }
            },
            {new:true}
        )
    }

    async findJobsForVerification(page:number,limit:number): Promise<IJob[] | null> {
        const skip = (page - 1) * limit; // Number of items to skip

        return await jobModel.find(
            {verification:'pending',isActive:true}
        )  
        .skip(skip)
        .limit(limit)
        .exec();
    }

    async verifyJob(jobId: string): Promise<IJob | null> {
        return await jobModel.findByIdAndUpdate(
            {_id:jobId},
            {
                $set:{
                    verification:'verified'
                }
            },
            {new:true}
        )
    }

   async findJobscount(): Promise<number> {
        return await jobModel.countDocuments({verification:'pending',isActive:true})
    }
}