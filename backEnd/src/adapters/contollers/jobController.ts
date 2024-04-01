import { Request,Response, } from "express";
import { JobUseCase } from "../../application/useCases/jobUseCase";
import { MongoDBQuery } from "../../application/interfaces/types/job";


export class JobController{
    constructor(
        private readonly _jobUseCase:JobUseCase
    ){}

    async getJobDetails(req:Request,res:Response){
        const moviedId = req.params.jobId;
        const apiRes = await this._jobUseCase.findJob(moviedId);
        res.status(apiRes.status).json(apiRes);
    }

    async getJobs(req:Request,res:Response){
        const  title = req.query.title as string;
        const location = req.query.location as string;
   
        
        // Construct criteria object with regex patterns
        const titleRegex = new RegExp(title, 'i'); // 'i' flag for case-insensitive matching
        const locationRegex = new RegExp(location, 'i');
        
        const query: MongoDBQuery = {
          $or: [
            { title: { $regex: titleRegex } },
            { location: { $regex: locationRegex } }
          ]
        };

        console.log(query);
        const apiRes = await this._jobUseCase.findJobs(query);
        res.status(apiRes.status).json(apiRes);
    }

    async addJob(req:Request,res:Response){
        const job = req.body.job;
        const apiRes = await this._jobUseCase.saveJob(job);
        res.status(apiRes.status).json(apiRes);
    }
}