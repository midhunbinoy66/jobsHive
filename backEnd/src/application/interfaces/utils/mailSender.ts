export interface ImailSender{
    sendOtp(email:string,otp:number):void;
}