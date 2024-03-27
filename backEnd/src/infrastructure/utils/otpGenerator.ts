import { IOTPGenerator } from "../../application/interfaces/utils/otpGeneratot";

export class OTPGenerator implements IOTPGenerator{
    genrateOTP(): number {
        return Math.floor(1000+Math.random()*9000);
    }
}