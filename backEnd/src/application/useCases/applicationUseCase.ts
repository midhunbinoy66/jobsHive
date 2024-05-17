import { STATUS_CODES } from "../../infrastructure/constants/httpStatusCodes";
import { IApplicantRepo } from "../interfaces/repos/applicatnRepo";
import { IApplicationReq } from "../interfaces/types/application";


export class ApplicationUseCase{
    constructor(
        private readonly _applicationRepo:IApplicantRepo
    ){}

    async saveApplication(applicationData:IApplicationReq){
     try {
            if(applicationData === undefined){
                return{
                    status:STATUS_CODES.BAD_REQUEST,
                    message:'no job data recieved',
                    data:null
                }
            }
            const application = await this._applicationRepo.saveApplication(applicationData)
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:application
            }
     } catch (error) {
        return {
            status:STATUS_CODES.INTERNAL_SERVER_ERROR,
            message:'Internal server error',
            data:null
        }
     }
    }


    async findUserApplications(userId:string,pageNumber:number,pageSize:number){
        try {
            const applications =await  this._applicationRepo.findAllApplication(userId,pageNumber,pageSize);
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:applications
            }
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal server error',
                data:null
            }
        }
    }

    async findEmployerJobApplications(jobId:string){
        try {
            const applications = await this._applicationRepo.findApplicationByJobId(jobId);
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:applications
            }
            
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal Server Error',
                data:null
            }
        }
    }

    async updateApplicationStatus(applicationId:string,status:string){
        try {
            const application = await this._applicationRepo.updateApplicationStatus(applicationId,status);
            return {
                status:STATUS_CODES.OK,
                message:'Success',
                data:application
            }
        } catch (error) {
            return {
                status:STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:'Internal Server Error',
                data:null
            }
        }
    }



    async getApplicationData(employerId:string){
        try {
            const applications = await this._applicationRepo.findApplicationByEmployerId(employerId)
            const applicationRecord:Record<string,number>={};
            applications?.forEach(app=>{
                if(!applicationRecord[app.jobId.toString()]){
                    applicationRecord[app.jobId.toString()] =0;
                }
                applicationRecord[app.jobId.toString()] =applicationRecord[app.jobId.toString()] +1;


            })
            const labels = Object.keys(applicationRecord)
            const data = Object.values(applicationRecord)
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


    async getDashboardData(employerId:string){
        try {
                const data = await this._applicationRepo.getDashBoardData(employerId)

                return {
                    status:STATUS_CODES.OK,
                    message:'Success',
                    data:data
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