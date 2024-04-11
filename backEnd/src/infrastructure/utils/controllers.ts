import { AdminController } from "../../adapters/contollers/adminController"
import { ApplicationController } from "../../adapters/contollers/applicationController"
import { Employercontoller } from "../../adapters/contollers/employerController"
import { JobController } from "../../adapters/contollers/jobController"
import { PlanController } from "../../adapters/contollers/planController"
import { UserController } from "../../adapters/contollers/userController"
import { AdminUseCase } from "../../application/useCases/adminUseCase"
import { ApplicationUseCase } from "../../application/useCases/applicationUseCase"
import { EmployeruseCase } from "../../application/useCases/employerUseCase"
import { JobUseCase } from "../../application/useCases/jobUseCase"
import { PlanUseCase } from "../../application/useCases/planUseCase"
import { UserUseCase } from "../../application/useCases/userUseCase"
import { AdminRepository } from "../repositories/adminRepository"
import { ApplicationRepository } from "../repositories/applicationRepository"
import { EmployerRepository } from "../repositories/employerRepository"
import { JobRepository } from "../repositories/jobRepository"
import { PlanRepository } from "../repositories/planRepository"
import { TempEmployerRepository } from "../repositories/tempEmployerRepository"
import { TempUserRepository } from "../repositories/tempUserRepository"
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

//UseCases
const userUseCase = new UserUseCase(userRepository,tempUserRepository,encryptor,tokenGenerator,mailSender,jobRepository);
const adminUseCase = new AdminUseCase(encryptor,adminRepository,tokenGenerator);
const employerUseCase = new EmployeruseCase(employerRepository,tempEmployerRepository,encryptor,tokenGenerator,mailSender,otpGenerator);
const jobUseCase = new JobUseCase(jobRepository);
const applicationUseCase = new ApplicationUseCase(applicationRepository);
const planUseCase = new PlanUseCase(planRepository);
//UserControllers
export const uController = new UserController(userUseCase,otpGenerator,encryptor);
export const aController = new AdminController(adminUseCase,userUseCase)
export const eContorller = new Employercontoller(employerUseCase,otpGenerator,encryptor);
export const jController = new JobController(jobUseCase);
export const appController = new ApplicationController(applicationUseCase);
export const pController = new PlanController(planUseCase) ;