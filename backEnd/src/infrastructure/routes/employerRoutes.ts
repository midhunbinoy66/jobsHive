import express from 'express'
import { appController, eContorller, jController } from '../utils/controllers';

const employerRouter = express.Router();

employerRouter.post('/register',(req,res)=>eContorller.employerRegister(req,res));
employerRouter.post('/validateOtp',(req,res)=>eContorller.validateUserOTP(req,res));
employerRouter.get('/resendOtp',(req,res)=>eContorller.resendOTP(req,res));
employerRouter.post('/login',(req,res)=>eContorller.employerLogin(req,res));
employerRouter.put('/update/:userId',(req,res)=>eContorller.updateProfile(req,res));

employerRouter.get('/job/:jobId',(req,res)=>jController.getJobDetails(req,res))
employerRouter.post('/create-job',(req,res)=>jController.addJob(req,res));
employerRouter.post('/update-job/:jobId',(req,res)=>jController.updateEmployerJob(req,res));
employerRouter.get('/jobs/:employerId',(req,res)=>jController.getAllEmployerJob(req,res));
employerRouter.get('/delete-job/:jobId',(req,res)=>jController.deleteEmployerJob(req,res));
employerRouter.get('/applications/:jobId',(req,res)=>appController.findEmployerJobApplcations(req,res));
employerRouter.patch('/application/:applicationId',(req,res)=>appController.updateEmployerJobApplication(req,res));
export default employerRouter;