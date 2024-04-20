import { IEmployerRepo } from "../../application/interfaces/repos/employerRepo";
import { IEmployerAuth, IEmployerRes, IEmployerUpdate } from "../../application/interfaces/types/employer";
import { IUserSubscription } from "../../entities/common";
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
        console.log(planData);    
        return await employerModel.findByIdAndUpdate(
                {_id:userId},
                {
                    subscription:planData
                },
                {new:true}
            )
      } 
}