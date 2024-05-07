import { IuserRepo } from "../../application/interfaces/repos/userRepo";
import { IWalletHistoryAndCount } from "../../application/interfaces/types/commont";
import { IResumeReq } from "../../application/interfaces/types/resume";
import { IUserAuth, IUserRes, IUserSocialAuth, IUserUpdate } from "../../application/interfaces/types/user";
import { IUserSubscription } from "../../entities/common";
import { IJob } from "../../entities/job";
import { IPlan } from "../../entities/plan";
import { IResume } from "../../entities/resume";
import { ITransaction } from "../../entities/tranaction";
import { IUser } from "../../entities/user";
import resumeModel from "../db/resumeModel";
import transactionModel from "../db/trascationModel";
import userModel from "../db/userModel";
import userPlanModel from "../db/userPlanModel";


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
            console.log(resume);
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


       async  findAllUsers(page: number, limit: number, searchQuery: string): Promise<IUserRes[] | null> {
            const regex = new RegExp(searchQuery,'i');
            return await userModel.find({
                $or:[
                    {name:{$regex:regex}},
                    {emaol:{$regex:regex}},
                    {mobile:{$regex:regex}}
                ]
            })
            .skip((page-1)*limit)
            .limit(limit)
            .select('-password')
            .exec()
        }

        async findUsersCount(searchQuery: string): Promise<number> {
        const regex = new RegExp(searchQuery ,'i');
        return await userModel.find({
            $or: [
                { name: { $regex: regex } },
                { email: { $regex: regex } },
                { mobile: { $regex: regex } }
            ]
        }).countDocuments() 
      }  

      async blockAndUblockUser(userId: string): Promise<void> {
          try {
                const user = await userModel.findById({_id:userId});
                if(user !== null){
                    user.isBlocked = !user.isBlocked;
                    await user.save();
                }else{
                throw Error('Something went wrong, userId didt received')
                }
          } catch (error) {
            throw Error('Error while blocking/unblocking user')
          }
      }

      async followEmployer(userId: string, employerId: string): Promise<IUserRes | null> {
        return await userModel.findByIdAndUpdate(
            {_id:userId},
            {
                $addToSet:{following:employerId}
            },
            {new:true}
        )
      }

      async unFollowEmplopyer(userId: string, employerId: string): Promise<IUserRes | null> {
            console.log(userId,employerId);
          return await userModel.findByIdAndUpdate(
            {_id:userId},
            {
              $pull:{following:employerId}   
            },
            {new:true}
          )
      }

      async getWalletHistory(userId: string, page: number, limit: number): Promise<IWalletHistoryAndCount | null> {
          const userData = await userModel.findById({_id:userId});
          return userData !== null ?{
            walletHistory:userData.walletHistory.slice((page-1)*limit,page * limit),
            count:userData.walletHistory.length
          }
          : null
      }

      async updateWallet(userId: string, amount: number, message: string): Promise<IUserRes | null> {
          return await userModel.findByIdAndUpdate(
            {_id:userId},
            {
                $inc:{wallet:amount},
                $push:{walletHistory:{amount,message}}
            },
            {
                new:true
            }
          )
      }

      async updateUserSubscription(userId: string, planData: IUserSubscription): Promise<IUserRes | null> {
        console.log(planData);
        const user = await userModel.findByIdAndUpdate(
                {_id:userId},
                {
                    subscription:planData
                },
                {new:true}
            )

            const plan:IPlan|null = await userPlanModel.findById({_id:planData.planId});
            const tranactionData:ITransaction = {
                userId:userId,
                amount:plan!.price,
                date:new Date(Date.now())
            }
            await transactionModel.create(tranactionData);

            return user
      } 


     async updateUserProfilePic(userId: string, fileName: string): Promise<IUserRes | null> {
          return await userModel.findByIdAndUpdate(
            {_id:userId},
            {
                $set:{
                    profilePic:fileName
                }
            },
            {new:true}
          )
      }

      async removeUserProfileDp(userId: string): Promise<IUserRes | null> {
        console.log('hitt...')
          return await userModel.findByIdAndUpdate(
            {_id:userId},
            {
                $unset:{
                    profilePic:''
                }
            },
            {new:true}
          )
      }

      async updateResumePath(userId: string, fileName: string): Promise<IUserRes | null> {
          console.log('resume hit');

          return await userModel.findByIdAndUpdate(
            {_id:userId},
            {
                $set:{
                    resume:fileName
                }
            },
            {new:true}
          )
      }
}