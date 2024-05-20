import express from 'express'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import userRouter from '../routes/userRoutes';
import adminRouter from '../routes/adminRoutes';
import employerRouter from '../routes/employerRoutes';
import tokenRouter from '../routes/tokenRoute';
import path from 'path';


export const createServer =  ()=>{
    try {
            const app =  express();
            app.use(express.json());
            app.use(express.urlencoded());
            app.use('/images',express.static(path.join(__dirname,'../../../images')))
            app.use('/resumes',express.static(path.join(__dirname,'../../../resumes')))
            app.use('/audios',express.static(path.join(__dirname,'../../../audios')))

            app.use(cookieParser());
            app.use(cors({
                credentials:true,
                origin:process.env.CORS_URI
            }))

            app.use('/user',userRouter);
            app.use('/admin',adminRouter);
            app.use('/employer',employerRouter);
            app.use('/token',tokenRouter);
            return app;

    } catch (error) {
            console.log('error logging from the create server ,from app.ts');
            console.log((error as Error).message);
    }
}