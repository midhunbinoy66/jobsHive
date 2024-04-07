import { IuserRepo } from "../../application/interfaces/repos/userRepo";
import { IResumeReq } from "../../application/interfaces/types/resume";
import { IUserAuth, IUserRes, IUserSocialAuth, IUserUpdate } from "../../application/interfaces/types/user";
import { IJob } from "../../entities/job";
import { IResume } from "../../entities/resume";
import { IUser } from "../../entities/user";
import resumeModel from "../db/resumeModel";
import userModel from "../db/userModel";


export class UserRespository implements IuserRepo {
        
       async saveUser(user: IUserAuth|IUserSocialAuth): Promise<IUser> {
        return await new userModel(user).save();
        }

        async  findByEmail(email: string): Promise<IUser | null> {
                return await userModel.findOne({ email })
        }

        async findById(id: string): Promise<IUser | null> {
              return await userModel.findById({_id:id});  
        }

        async updateGoogleAuth(id: string, profilePic: string | undefined){
                try {
                    const userData =  await userModel.findById({ _id: id })
                    if(userData){
                        userData.isGoogleAuth = true
                        if(!userData.profilePic) userData.profilePic = profilePic
                        await userData.save()
                    }
                } catch (error) {
                    console.log(error);
                    throw Error('Error while updating google auth')
                }
            }

        async updateUser(userId: string, user: IUserUpdate): Promise<IUserRes | null> {
            return await userModel.findByIdAndUpdate(
                {_id:userId},
                {
                    name:user.name,
                    mobile:user.mobile,
                    address:user.address
                },
                {new:true}
            )
        }

        async updateUserSavedJobs(userId: string, job: IJob): Promise<IUserRes | null> {
                return await userModel.findByIdAndUpdate(
                    {_id:userId},
                    {
                        $addToSet:{savedJobs:job._id}
                    },
                    {new:true}
                )
        }

        async saveUserResume(userId: string, resume: IResumeReq): Promise<IResume | null> {
                    return await resumeModel.findOneAndUpdate(
                        {userId:userId},
                        {
                            $set:{
                                name:resume.name,
                                email:resume.email,
                                mobile:resume.mobile,
                                languages:resume.languages,
                                education:resume.education,
                                workExperience:resume.workExperience,
                                skills:resume.skills
                            }
                        },
                        {upsert:true,new:true}
                    )
        }


        async findResumeByUserId(userId: string): Promise<IResume | null> {
            return await resumeModel.findOne({userId:userId})
        }

        async removeUserSavedJob(userId: string, jobId: string): Promise<IUserRes | null> {
            return await userModel.findByIdAndUpdate(
                {_id:userId},
                {
                    $pull:{savedJobs:jobId}
                },
                {new:true}
            );
              
        }

}