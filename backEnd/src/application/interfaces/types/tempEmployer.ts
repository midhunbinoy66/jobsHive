import { ITempEmployer } from "../../../entities/temp/tempEmployer";
import { IApiRes } from "./commont";


export interface ITempEmployerReq extends Omit<ITempEmployer, '_id'|'expireAt'>{}
export interface ITempEmployerRes extends ITempEmployer{}
export interface IApiTempEmployerRes extends IApiRes<ITempEmployerRes|null>{}