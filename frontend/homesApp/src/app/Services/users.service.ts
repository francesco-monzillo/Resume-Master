import { Injectable } from '@angular/core';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //This app was using a json-server to mock a backend. So i need to change this url to refer to the backend FastAPI server to serve data in the MongoDB database.
  users_url = '/api/user';
  get_sub_url = '/get';
  create_sub_url = '/create';
  all_sub_url = '/all';

  constructor() { }

  async getAllUsers(): Promise<User[]> {
    const data = await fetch(this.users_url + this.all_sub_url);
    return await data.json() ?? [];
  }

  async getUserById(id: string): Promise<User | undefined> {
    const data = await fetch(`${this.users_url}${this.get_sub_url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}
