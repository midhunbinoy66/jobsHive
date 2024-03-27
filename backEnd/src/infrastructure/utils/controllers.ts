import { UserController } from "../../adapters/contollers/userController"
import { UserUseCase } from "../../application/useCases/userUseCase"
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

const userRepository = new UserRespository()
const tempUserRepository = new TempUserRepository()


const userUseCase = new UserUseCase(userRepository,tempUserRepository,encryptor,tokenGenerator,mailSender)


export const uController = new UserController(userUseCase,otpGenerator,encryptor);