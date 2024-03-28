import { IAdminRepo } from "../../application/interfaces/repos/adminRespo";
import { IAdmin } from "../../entities/admin";
import { adminModel } from "../db/adminModel";


export class AdminRepository implements IAdminRepo{
    findAdmin(): Promise<IAdmin | null> {
        return adminModel.findOne();
    }

    findById(adminId:string): Promise<IAdmin | null> {
            return adminModel.findById(adminId);
    }
}