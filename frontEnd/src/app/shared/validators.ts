import { Validators } from "@angular/forms";
import { userNameMinLength,userNameMaxLength,nameRegex,emailRegex,OTPRegex,passwordMinLength,passwordRegex ,mobileRegex, commonMaxLength, commonMinLength, numRegex, MIN_WALLET_ADD, MAX_WALLET_ADD, MIN_SALARY_AMOUNT} from "./constants";

export const nameValidators =[
    Validators.required,
    Validators.minLength(userNameMinLength),
    Validators.maxLength(userNameMaxLength),
    Validators.pattern(nameRegex)
]

export const emailValidators =[
    Validators.required,
    Validators.pattern(emailRegex)
]

export const passwordValidators = [
    Validators.required,
    Validators.minLength(passwordMinLength),
    Validators.pattern(passwordRegex)
]

export const otpValidators = [
    Validators.required,
    Validators.pattern(OTPRegex)
  ]



export const requiredValidator = [Validators.required]

export const mobileValidators = [
    Validators.pattern(mobileRegex),
    Validators.required
  ]


export const commonValidators =[
    Validators.required,
    Validators.minLength(commonMinLength),
    Validators.maxLength(commonMaxLength),
]

export const salaryValidators =[
    Validators.required,
    Validators.min(MIN_SALARY_AMOUNT),
]

export const walletAmountValidators =[
    Validators.required,
    Validators.pattern(numRegex),
    Validators.min(MIN_WALLET_ADD),
    Validators.max(MAX_WALLET_ADD)
]