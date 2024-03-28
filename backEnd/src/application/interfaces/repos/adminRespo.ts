import { IAdmin } from "../../../entities/admin";


export interface IAdminRepo{
    findAdmin():Promise<IAdmin|null>;
    findById(adminId:string):Promise<IAdmin|null>;
}