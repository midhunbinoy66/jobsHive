import { IEmployerAndCount } from "./employer";
import { ITempEmployerRes } from "./tempEmployer";
import { ITempUserRes } from "./tempUser";
import { IUserAndCount, IUserRes } from "./user";

export type AllResTypes = ITempEmployerRes | ITempUserRes | null | IUserAndCount |IUserRes | IEmployerAndCount

export interface IApiRes<T extends AllResTypes> {
    status: number;
    message: string;
    data: T;
}