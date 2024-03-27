import { IEncryptor } from "../../application/interfaces/utils/encryptor";
import bcrypt from 'bcrypt'

export class Encryptor implements IEncryptor{

        async encryptPassword(password: string): Promise<string> {
                const saltRound =10;
                const salt = await bcrypt.genSalt(saltRound);
                const hashedPassword  = await bcrypt.hash(password,salt);
                return hashedPassword; 
        }

        async comparePassword(pass: string, hashedPassword: string): Promise<boolean> {
                return await bcrypt.compare(pass,hashedPassword);  
        }
}