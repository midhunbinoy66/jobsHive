import express from 'express';
import { jController, uController } from '../utils/controllers';

const userRouter = express.Router();



userRouter.post('/register',(req,res)=>uController.userRegister(req,res));
userRouter.post('/validateOtp',(req,res)=>uController.validateUserOTP(req,res));
userRouter.get('/resendOtp',(req,res)=>uController.resendOTP(req,res));
userRouter.post('/login',(req,res)=>uController.userLogin(req,res));
userRouter.get('/jobs',(req,res)=>jController.getJobs(req,res))
userRouter.post('/auth/google',(req,res)=>uController.userSocialSignUp(req,res));
export default userRouter