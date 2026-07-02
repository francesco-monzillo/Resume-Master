import { History } from "./history";

export interface User {
    _id:string,
    name:string,
    email:string,
    history:History,
}
