import { STATUS_CODES } from "../../infrastructure/constants/httpStatusCodes";
import { getDateKeyWithInterval } from "../../infrastructure/helperFucntions/dashbordHelper";
import { TransactionRepository } from "../../infrastructure/repositories/tranasactionRepository";



export class TransactionUseCase {
    constructor(
        private readonly transactionRepository:TransactionRepository
    ){}

    async getRevenueAdmin(startDate?:Date,endDate?:Date){
        try {
                if(!startDate || ! endDate){
                    startDate = new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        1
                );
                endDate = new Date();
                }

                const transactions  = await this.transactionRepository.findTransactionByTime(startDate,endDate);
                const addedAmt:Record<string, number> = {} 
                transactions?.forEach(trt=>{
                    const dateKey = getDateKeyWithInterval(startDate as Date, endDate as Date,trt.date)
                    if (!addedAmt[dateKey]) {
                        addedAmt[dateKey] = 0;
                    }
                    addedAmt[dateKey] += trt.amount
                }) 
                const labels = Object.keys(addedAmt)
                const data = Object.values(addedAmt)
                return {
                    status:STATUS_CODES.OK,
                    message:'Success',
                    data:{labels,data}
                }
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal Server Error',
                data:null
            }
        }
    }
}