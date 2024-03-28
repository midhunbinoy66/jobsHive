import express from 'express';
import { aController } from '../utils/controllers';

const adminRouter = express.Router();

adminRouter.post('/login',(req,res)=>aController.adminLogin(req,res));

export default adminRouter