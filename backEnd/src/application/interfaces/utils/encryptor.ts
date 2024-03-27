

export interface IEncryptor{
    encryptPassword (password:string):Promise<string>;
    comparePassword(pass:string,hashedPassword:string):Promise<boolean>
}