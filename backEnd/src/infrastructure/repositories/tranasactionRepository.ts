import { ITransactionRepo } from "../../application/interfaces/repos/transactionRepo";
import { ITransactionReport } from "../../entities/tranaction";
import applicationModel from "../db/applicaitonModel";
import { employerModel } from "../db/employerModel";
import transactionModel from "../db/trascationModel";
import userModel from "../db/userModel";


export class TransactionRepository implements ITransactionRepo{

    async findTransactionByTime(startDate: Date , endDate: Date): Promise<ITransactionReport[] | null> {
        return await transactionModel.find(
            {
                $and:[
                    {date:{$gte:startDate}},
                    {date:{$lte:endDate}}
                ]
            }
        ).populate('planId')
        .populate('userId')
        .populate('employerId')    
    }


    async getDashboardDataForAdmin(){
        const numberOfUsers = await userModel.countDocuments();
        const numberOfEmployers = await employerModel.countDocuments();
        const numberOfApplications = await applicationModel.countDocuments();
        const recentTransactions = await transactionModel.find().sort({date:-1}).limit(3).populate('userId').populate('employerId')
        return {
            numberOfUsers,
            numberOfEmployers,
            numberOfApplications,
            recentTransactions
        }
    }


}