import { Injectable } from '@angular/core';
import { User } from '../Interfaces/user';
import { Organization } from '../Interfaces/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  //This app was using a json-server to mock a backend. So i need to change this url to refer to the backend FastAPI server to serve data in the MongoDB database.
  organizations_url = '/api/organization';
  get_sub_url = '/get';
  create_sub_url = '/create';
  all_sub_url = '/all';

  constructor() { }

  async getAllOrganizations(): Promise<Organization[]> {
    const data = await fetch(this.organizations_url + this.all_sub_url);
    return await data.json() ?? [];
  }

  async getOrganizationById(id: string): Promise<Organization | undefined> {
    const data = await fetch(`${this.organizations_url}${this.get_sub_url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}
