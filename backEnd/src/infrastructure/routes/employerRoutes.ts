import express from 'express'
import { eContorller } from '../utils/controllers';

const employerRouter = express.Router();

employerRouter.post('/register',(req,res)=>eContorller.employerRegister(req,res));
employerRouter.post('/validateOtp',(req,res)=>eContorller.validateUserOTP(req,res));
employerRouter.get('/resendOtp',(req,res)=>eContorller.resendOTP(req,res));
employerRouter.post('/login',(req,res)=>eContorller.employerLogin(req,res));
export default employerRouter;