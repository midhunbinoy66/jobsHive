import express from 'express';
import { aController, jController, pController } from '../utils/controllers';

const adminRouter = express.Router();

adminRouter.post('/login',(req,res)=>aController.adminLogin(req,res));
adminRouter.get('/dashboard/revenue',(req, res) => aController.getRevenueData(req, res))
adminRouter.post('/download/report',(req,res)=>aController.getTransactionPdf(req,res));
adminRouter.get('/users',(req,res)=>aController.getAllUser(req,res));
adminRouter.patch( '/users/block/:userId',(req,res)=>aController.blockUser(req,res))
adminRouter.post('/create-plan',(req,res)=>pController.createPlan(req,res));
adminRouter.patch('/delete-plan/:planId',(req,res)=>pController.deletePlan(req,res));
adminRouter.put('/update-plan/:planId',(req,res)=>pController.updatPlan(req,res));
adminRouter.get('/employers',(req,res)=>aController.getAllEmployers(req,res));
adminRouter.patch( '/employers/block/:userId',(req,res)=>aController.blockEmployers(req,res))
adminRouter.get('/jobs',(req,res)=>jController.getJobsforVerification(req,res));
adminRouter.patch('/job-verify/:jobId',(req,res)=>jController.verifyJob(req,res));
adminRouter.get('/dashboard/data',(req,res)=>aController.getDashboardData(req,res))
export default adminRouter