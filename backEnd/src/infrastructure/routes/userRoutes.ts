import express from 'express';
import { appController, jController, uController } from '../utils/controllers';

const userRouter = express.Router();



userRouter.post('/register',(req,res)=>uController.userRegister(req,res));
userRouter.post('/validateOtp',(req,res)=>uController.validateUserOTP(req,res));
userRouter.get('/resendOtp',(req,res)=>uController.resendOTP(req,res));
userRouter.post('/login',(req,res)=>uController.userLogin(req,res));
userRouter.get('/jobs',(req,res)=>jController.getJobs(req,res))
userRouter.post('/auth/google',(req,res)=>uController.userSocialSignUp(req,res));
userRouter.put('/update/:userId',(req,res)=>uController.updateProfile(req,res));
userRouter.put('/saveJob/:userId',(req,res)=>uController.updateUserSavedJobs(req,res));
userRouter.post('/saved-jobs',(req,res)=>jController.getUserSavedJobs(req,res));
userRouter.get('/applied-jobs/:userId',(req,res)=>appController.findUserApplications(req,res));
userRouter.post('/job/apply',(req,res)=>appController.saveApplication(req,res));
userRouter.get('/resume/:userId',(req,res)=>uController.findUserResume(req,res));
userRouter.post('/resume/:userId',(req,res)=>uController.saveUserResume(req,res));
export default userRouter