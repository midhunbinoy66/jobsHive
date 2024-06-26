import express from 'express';
import { appController, chatController, eContorller, jController, pController, uController } from '../utils/controllers';
import { userAuth } from '../middleware/userAuth';
import { upload } from '../config/multer';
import {uploadResume} from '../config/multerResume'
import {uploadAudio} from '../config/multerAudio' 



const userRouter = express.Router();



userRouter.post('/register',(req,res)=>uController.userRegister(req,res));
userRouter.post('/validateOtp',(req,res)=>uController.validateUserOTP(req,res));
userRouter.get('/resendOtp',(req,res)=>uController.resendOTP(req,res));
userRouter.post('/login',(req,res)=>uController.userLogin(req,res));
userRouter.post('/auth/google',(req,res)=>uController.userSocialSignUp(req,res));
userRouter.patch('/update/profileimage/:userId',upload.single('image'),(req,res)=>uController.updateUserProfilePhoto(req,res))
userRouter.patch('/remove/profileimage/:userId', (req,res) => uController.removeUserProfileDp(req,res))
userRouter.patch('/upload/resume/:userId',uploadResume.single('file'),(req,res)=>uController.uploadUserResume(req,res))

userRouter.get('/chat/employers/:userId',(req,res)=>chatController.getEmployersChattedWith(req,res));
userRouter.get('/chat/history',(req,res)=>chatController.getChatHistory(req,res));

userRouter.get('/jobs',(req,res)=>jController.getJobs(req,res))
userRouter.post('/jobs/skills',(req,res)=>jController.getJobsBySkill(req,res))
userRouter.put('/update/:userId',userAuth,(req,res)=>uController.updateProfile(req,res));
userRouter.put('/saveJob/:userId',userAuth,(req,res)=>uController.updateUserSavedJobs(req,res));
userRouter.post('/saved-jobs',userAuth,(req,res)=>jController.getUserSavedJobs(req,res));
userRouter.get('/applied-jobs/:userId',(req,res)=>appController.findUserApplications(req,res));
userRouter.post('/job/apply',userAuth,(req,res)=>appController.saveApplication(req,res));
userRouter.get('/resume/:userId',(req,res)=>uController.findUserResume(req,res));
userRouter.post('/resume/:userId',userAuth,(req,res)=>uController.saveUserResume(req,res));
userRouter.get('/plans',(req,res)=>pController.findAllPlans(req,res));
userRouter.get('/plans/:planId',(req,res)=>pController.findPlan(req,res));
userRouter.get('/get/:userId',(req,res)=>uController.findUserDetails(req,res));
userRouter.post('/remove/saved-jobs/:userId',userAuth,(req,res)=>uController.userRemoveSavedJob(req,res));
userRouter.patch('/follow/:userId',userAuth,(req,res)=>uController.followEmployer(req,res));
userRouter.patch('/unfollow/:userId',userAuth,(req,res)=>uController.unfollowEmployer(req,res));
userRouter.get('/wallet-history/:userId',userAuth,(req,res)=>uController.getWalletHistory(req,res));
userRouter.patch('/wallet/add/:userId',userAuth,(req,res)=>uController.addToWallet(req,res));
userRouter.patch('/subscription/:userId',userAuth,(req,res)=>uController.userPlanSubscribe(req,res))
userRouter.get('/employer/:employerId',(req,res)=>eContorller.getEmployerData(req,res))
userRouter.post('/upload-audio',uploadAudio.single('audio'),(req,res)=>uController.uploadUserAudio(req,res));
userRouter.post('/upload-image',upload.single('image'),(req,res)=>uController.uploadUserImage(req,res));

export default userRouter