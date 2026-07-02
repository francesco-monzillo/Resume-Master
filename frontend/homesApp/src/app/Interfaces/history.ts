import { Organization } from "./organization";

export interface History {
    _id : string
    summary : string
    projects : Array<any>
    education : Array<any>
    organizations : Array<Organization>
    technical_skills : Array<any>
    organizational_skills : Array<any>
}