
import { IApplicantRepo } from "../../application/interfaces/repos/applicatnRepo";
import { IApplcationAndCountRes, IApplicationReq } from "../../application/interfaces/types/application";
import { IApplication } from "../../entities/application";
import applicationModel from "../db/applicaitonModel";

export class ApplicationRepository implements IApplicantRepo{
    async findAllApplication(userId: string,pageNumber:number,pageSize:number): Promise<IApplcationAndCountRes | null> {
        const skip = (pageNumber-1)*pageSize;
        const applications = await applicationModel.find({userId:userId})
        .skip(skip)
        .limit(pageSize)
        .exec()
        const applicationsCount = await applicationModel.countDocuments({userId:userId}) 

        return {
            applications,
            applicationsCount
        }
    }

    async findApplicaitonById(applicationId: string): Promise<IApplication | null> {
        return await applicationModel.findById(applicationId);
    }

    async saveApplication(applicationData:IApplicationReq): Promise<IApplication | null> {

       
        // return await new applicationModel(applicationData).save() 

        return await applicationModel.findOneAndUpdate(
            {userId:applicationData.userId,jobId:applicationData.jobId},
            {
                $set:{
                    jobTitle:applicationData.jobTitle,
                    jobLocation:applicationData.jobLocation,
                    coverLetter:applicationData.coverLetter,
                    resume:applicationData.resume
                }
            },
            {upsert:true,new:true}
        )
    }

   async findApplicationByJobId(jobId: string): Promise<IApplication[] | null> {
            return await applicationModel.find({jobId:jobId})
    }

    async updateApplicationStatus(applicationId: string, status: string): Promise<IApplication | null> {
            return await applicationModel.findByIdAndUpdate(
                {_id:applicationId},
                {$set:
                    {status:status}
                }
            )
    }
}