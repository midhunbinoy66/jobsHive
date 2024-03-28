import { AdminController } from "../../adapters/contollers/adminController"
import { UserController } from "../../adapters/contollers/userController"
import { AdminUseCase } from "../../application/useCases/adminUseCase"
import { UserUseCase } from "../../application/useCases/userUseCase"
import { AdminRepository } from "../repositories/adminRepository"
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

//UseCases
const userUseCase = new UserUseCase(userRepository,tempUserRepository,encryptor,tokenGenerator,mailSender)
const adminUseCase = new AdminUseCase(encryptor,adminRepository,tokenGenerator);

//UserControllers
export const uController = new UserController(userUseCase,otpGenerator,encryptor);
export const aController = new AdminController(adminUseCase)