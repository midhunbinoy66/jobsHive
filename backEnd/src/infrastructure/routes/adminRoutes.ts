import express from 'express';
import { aController, pController } from '../utils/controllers';

const adminRouter = express.Router();

adminRouter.post('/login',(req,res)=>aController.adminLogin(req,res));
adminRouter.get('/users',(req,res)=>aController.getAllUser(req,res));
adminRouter.patch( '/users/block/:userId',(req,res)=>aController.blockUser(req,res))
adminRouter.post('/create-plan',(req,res)=>pController.createPlan(req,res));
adminRouter.patch('/delete-plan/:planId',(req,res)=>pController.deletePlan(req,res));
adminRouter.put('/update-plan/:planId',(req,res)=>pController.updatPlan(req,res));
export default adminRouter