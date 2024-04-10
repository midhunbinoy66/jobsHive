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


    async findUserApplications(userId:string){
        try {
            const applications =await  this._applicationRepo.findAllApplication(userId);
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
}