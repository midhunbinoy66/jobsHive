import { ITransaction } from "../../../entities/tranaction";


export interface ITransactionRepo{
    findTransactionByTime(startDate:Date,endDate:Date):Promise<ITransaction[] | null>
}