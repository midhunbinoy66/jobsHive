import { AdminController } from "../../adapters/contollers/adminController"
import { Employercontoller } from "../../adapters/contollers/employerController"
import { JobController } from "../../adapters/contollers/jobController"
import { UserController } from "../../adapters/contollers/userController"
import { AdminUseCase } from "../../application/useCases/adminUseCase"
import { EmployeruseCase } from "../../application/useCases/employerUseCase"
import { JobUseCase } from "../../application/useCases/jobUseCase"
import { UserUseCase } from "../../application/useCases/userUseCase"
import { AdminRepository } from "../repositories/adminRepository"
import { EmployerRepository } from "../repositories/employerRepository"
import { JobRepository } from "../repositories/jobRepository"
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


//UseCases
const userUseCase = new UserUseCase(userRepository,tempUserRepository,encryptor,tokenGenerator,mailSender)
const adminUseCase = new AdminUseCase(encryptor,adminRepository,tokenGenerator);
const employerUseCase = new EmployeruseCase(employerRepository,tempEmployerRepository,encryptor,tokenGenerator,mailSender,otpGenerator);
const jobUseCase = new JobUseCase(jobRepository);


//UserControllers
export const uController = new UserController(userUseCase,otpGenerator,encryptor);
export const aController = new AdminController(adminUseCase)
export const eContorller = new Employercontoller(employerUseCase,otpGenerator,encryptor);
export const jController = new JobController(jobUseCase);