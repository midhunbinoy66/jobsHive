import { IWalletHistory } from "../../../entities/common";
import { IChatRes, IUserListForChats } from "./chat";
import { IEmployerAndCount } from "./employer";
import { ITempEmployerRes } from "./tempEmployer";
import { ITempUserRes } from "./tempUser";
import { IUserAndCount, IUserRes } from "./user";

export type AllResTypes = ITempEmployerRes | ITempUserRes | null | IUserAndCount |IUserRes | IEmployerAndCount| IWalletHistoryAndCount |IChatRes | IUserListForChats[]

export interface IApiRes<T extends AllResTypes> {
    status: number;
    message: string;
    data: T;
}

export interface IWalletHistoryAndCount {
    walletHistory: IWalletHistory[],
    count: number
}
