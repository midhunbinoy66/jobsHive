import { environment } from 'src/environments/environment.development'

export const OTP_TIMER = 60 * 3 // 3 min in seconds
export const OTP_RESEND_MAX_TIME = 1000 * 60 * 10 // 10 min in milliseconds
export const TICKET_EXPIRE_TIME = 60 * 10 // 10 min seconds
export const MAX_OTP_LIMIT = 3
export const MIN_COLS = 5
export const MAX_COLS = 30
export const MIN_TICKET_PRICE = 50
export const MAX_TICKET_PRICE = 5000
export const screenNameMinLength = 3
export const screenNameMaxLength = 10
export const passwordMinLength = 8
export const userNameMinLength = 3
export const userNameMaxLength = 20
export const MIN_SALARY_AMOUNT =10000
export const MAX_SALARY_AMOUNT =50000
export const MAX_WALLET_ADD = 50000
export const MIN_WALLET_ADD = 100
export const MIN_PLAN_AMOUNT = 200
export const commonMinLength = 3
export const commonMaxLength = 50


export const emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
export const OTPRegex = '^[1-9][0-9]{3}$'
export const ZipRegex = '^[1-9][0-9]{5}$'
export const nameRegex = `^[a-zA-Z ]{${userNameMinLength},${userNameMaxLength}}$`
export const passwordRegex = `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{${passwordMinLength},}$`
export const charRegex = /^[A-Z]$/
export const numRegex = '^\\d+$'
export const screenNameRegex = `^[a-zA-Z0-9 ]{${screenNameMinLength},${screenNameMaxLength}}$`
export const mobileRegex = '^[1-9][0-9]{9}$'

export const MinAge = 10
export const MinDate = new Date(1960, 0, 1)
export const nonAuthRotues = ['login', 'register']
export const imagesFolderPath = environment.baseUrl + '/images/'
