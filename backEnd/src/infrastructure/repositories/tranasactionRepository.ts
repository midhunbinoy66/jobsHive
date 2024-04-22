import { ITransactionRepo } from "../../application/interfaces/repos/transactionRepo";
import { ITransaction } from "../../entities/tranaction";
import transactionModel from "../db/trascationModel";


export class TransactionRepository implements ITransactionRepo{

    async findTransactionByTime(startDate: Date , endDate: Date ): Promise<ITransaction[] | null> {
        return await transactionModel.find(
            {
                $and:[
                    {date:{$gte:startDate}},
                    {date:{$lte:endDate}}
                ]
            }
        )    
    }
}