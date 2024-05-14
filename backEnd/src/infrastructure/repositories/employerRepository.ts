import { IEmployerRepo } from "../../application/interfaces/repos/employerRepo";
import { IWalletHistoryAndCount } from "../../application/interfaces/types/commont";
import { IEmployerAuth, IEmployerRes, IEmployerUpdate } from "../../application/interfaces/types/employer";
import { IUserSubscription } from "../../entities/common";
import { IEmployer } from "../../entities/employer";
import { ITransaction } from "../../entities/tranaction";
import { employerModel } from "../db/employerModel";
import transactionModel from "../db/trascationModel";
import userPlanModel from "../db/userPlanModel";
import { processSubscriptionQueueEmployer } from "../helperFucntions/subscriptionQueueProcess";



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

    async  findAllUsers(page: number, limit: number, searchQuery: string): Promise<IEmployerRes[] | null> {
        const regex = new RegExp(searchQuery,'i');
        return await employerModel.find({
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
        return await employerModel.find({
            $or: [
                { name: { $regex: regex } },
                { email: { $regex: regex } },
                { mobile: { $regex: regex } }
            ]
        }).countDocuments() 
      }  

      async blockAndUblockUser(userId: string): Promise<void> {
          try {
                const user = await employerModel.findById({_id:userId});
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
      
      async updateUser(userId: string, user: IEmployerUpdate): Promise<IEmployerRes | null> {
        return await employerModel.findByIdAndUpdate(
            {_id:userId},
            {
                name:user.name,
                mobile:user.mobile,
                address:user.address
            },
            {new:true}
        )
      }

      async findFollowingEmployers(employerIds: string[]): Promise<IEmployer[] | null> {
          return await employerModel.find({
            _id: { $in: employerIds }
        }).exec();
      }

      async updateUserSubscription(userId: string, planData: IUserSubscription): Promise<IEmployerRes | null> {
        
        const employerData = await employerModel.findById({_id:userId});
        let employer;

        if(!employerData?.subscription){
           employer = await employerModel.findByIdAndUpdate(
                {_id:userId},
                {
                    subscription:planData
                },
                {new:true}
            )
        }else{
            employer = await employerModel.findByIdAndUpdate(
                {_id:userId},
                {
                    $push:{subscriptionChangeQueue:planData.planId}
                },
                {new:true}
            )
        }

        processSubscriptionQueueEmployer();
        const plan = await userPlanModel.findById({_id:planData.planId});

            const tranactionData:ITransaction = {
                employerId:userId,
                amount:plan!.price,
                planId:planData.planId,
                date:new Date(Date.now())
            }
            await transactionModel.create(tranactionData);

            return employer
      } 



      async getWalletHistory(userId: string, page: number, limit: number): Promise<IWalletHistoryAndCount | null> {
        const userData = await employerModel.findById({_id:userId});
        return userData !== null ?{
          walletHistory:userData.walletHistory.slice((page-1)*limit,page * limit),
          count:userData.walletHistory.length
        }
        : null
    }

    async updateWallet(userId: string, amount: number, message: string): Promise<IEmployerRes | null> {
        return await employerModel.findByIdAndUpdate(
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
}