import { ITempEmployerRes } from "./tempEmployer";
import { ITempUserRes } from "./tempUser";
import { IUserAndCount } from "./user";

export type AllResTypes = ITempEmployerRes | ITempUserRes | null | IUserAndCount

export interface IApiRes<T extends AllResTypes> {
    status: number;
    message: string;
    data: T;
}