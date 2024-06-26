import { AdminController } from "../../adapters/contollers/adminController"
import { ApplicationController } from "../../adapters/contollers/applicationController"
import { ChatController } from "../../adapters/contollers/chatContorllers"
import { Employercontoller } from "../../adapters/contollers/employerController"
import { JobController } from "../../adapters/contollers/jobController"
import { PlanController } from "../../adapters/contollers/planController"
import { UserController } from "../../adapters/contollers/userController"
import { AdminUseCase } from "../../application/useCases/adminUseCase"
import { ApplicationUseCase } from "../../application/useCases/applicationUseCase"
import { ChatUseCase } from "../../application/useCases/chatUseCase"
import { EmployeruseCase } from "../../application/useCases/employerUseCase"
import { JobUseCase } from "../../application/useCases/jobUseCase"
import { PlanUseCase } from "../../application/useCases/planUseCase"
import { TransactionUseCase } from "../../application/useCases/trasactionUseCase"
import { UserUseCase } from "../../application/useCases/userUseCase"
import { AdminRepository } from "../repositories/adminRepository"
import { ApplicationRepository } from "../repositories/applicationRepository"
import { ChatRepository } from "../repositories/chatRepository"
import { EmployerRepository } from "../repositories/employerRepository"
import { JobRepository } from "../repositories/jobRepository"
import { PlanRepository } from "../repositories/planRepository"
import { TempEmployerRepository } from "../repositories/tempEmployerRepository"
import { TempUserRepository } from "../repositories/tempUserRepository"
import { TransactionRepository } from "../repositories/tranasactionRepository"
import { UserRespository } from "../repositories/userRepository"
import { Encryptor } from "./bcryptPassword"
import { TokenGenerator } from "./jwtToken"
import { MailSender } from "./nodeMailer"
import { OTPGenerator } from "./otpGenerator"


// Utils
const encryptor = new Encryptor()
const tokenGenerator = new TokenGenerator()
const mailSender = new MailSender()
const otpGenerator = new OTPGenerator()

//Repositories
const userRepository = new UserRespository()
const tempUserRepository = new TempUserRepository()
const adminRepository = new AdminRepository()
const tempEmployerRepository  = new TempEmployerRepository();
const employerRepository  = new EmployerRepository(); 
const jobRepository = new JobRepository();
const applicationRepository = new ApplicationRepository();
const planRepository  = new PlanRepository();
const transactionRepository = new TransactionRepository();
const chatRepository = new ChatRepository();

//UseCases
const userUseCase = new UserUseCase(userRepository,tempUserRepository,encryptor,tokenGenerator,mailSender,jobRepository,employerRepository);
const adminUseCase = new AdminUseCase(encryptor,adminRepository,tokenGenerator);
const employerUseCase = new EmployeruseCase(employerRepository,tempEmployerRepository,encryptor,tokenGenerator,mailSender,otpGenerator);
const jobUseCase = new JobUseCase(jobRepository);
const applicationUseCase = new ApplicationUseCase(applicationRepository);
const planUseCase = new PlanUseCase(planRepository);
const transactionUseCase = new TransactionUseCase(transactionRepository);
export const chatUseCase = new ChatUseCase(chatRepository);
//UserControllers
export const uController = new UserController(userUseCase,otpGenerator,encryptor);
export const aController = new AdminController(adminUseCase,userUseCase,employerUseCase,transactionUseCase)
export const eContorller = new Employercontoller(employerUseCase,otpGenerator,encryptor,applicationUseCase);
export const jController = new JobController(jobUseCase);
export const appController = new ApplicationController(applicationUseCase);
export const pController = new PlanController(planUseCase) ;
export const chatController = new ChatController(chatUseCase);
