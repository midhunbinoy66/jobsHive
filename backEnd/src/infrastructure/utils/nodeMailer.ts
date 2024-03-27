import { ImailSender } from "../../application/interfaces/utils/mailSender";
import { mailTransporter } from "../config/mailTransporter";
import { getOTPTemplate } from "../helperFucntions/getMailTemplate";

export class MailSender implements ImailSender{
    sendOtp(email: string, otp: number): void {

            const template = getOTPTemplate(otp);
            const details = {
                from:process.env.EMAIL,
                to:email,
                subject:'jobHive Verification',
                html:template
            };

            mailTransporter.sendMail(details, ( err:Error | null ) => {
                if (err) {
                    console.log(err.message);
                }
            });
    }
}