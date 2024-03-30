import { ITempEmployerRes } from "./tempEmployer";
import { ITempUserRes } from "./tempUser";

export type AllResTypes = ITempEmployerRes | ITempUserRes | null

export interface IApiRes<T extends AllResTypes> {
    status: number;
    message: string;
    data: T;
}