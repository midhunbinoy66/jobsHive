import express from 'express'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import userRouter from '../routes/userRoutes';
import adminRouter from '../routes/adminRoutes';
import employerRouter from '../routes/employerRoutes';


export const createServer =  ()=>{
    try {
            const app =  express();
            app.use(express.json());
            app.use(express.urlencoded());
            app.use(cookieParser());
            app.use(cors({
                credentials:true,
                origin:process.env.CORS_URI
            }))

            app.use('/user',userRouter);
            app.use('/admin',adminRouter);
            app.use('/employer',employerRouter);
            return app;

    } catch (error) {
            console.log('error logging from the create server ,from app.ts');
            console.log((error as Error).message);
    }
}