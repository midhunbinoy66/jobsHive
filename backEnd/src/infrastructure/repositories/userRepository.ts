import { IuserRepo } from "../../application/interfaces/repos/userRepo";
import { IUserAuth, IUserRes, IUserSocialAuth, IUserUpdate } from "../../application/interfaces/types/user";
import { IJob } from "../../entities/job";
import { IUser } from "../../entities/user";
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
                        $push:{savedJobs:job._id}
                    },
                    {new:true}
                )
        }

}