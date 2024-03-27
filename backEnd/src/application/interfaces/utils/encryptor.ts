

export interface IEncryptor{
    encryptPassword (password:string):Promise<string>
}