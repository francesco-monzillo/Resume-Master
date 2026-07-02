import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../Services/users.service';
import { User } from '../Interfaces/user';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UserDetailsComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by id" #user_id_filer>
        <button class="primary" type="button" (click)="filterResults(user_id_filer.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-user-details *ngFor="let user of usersList" [user]="user"></app-user-details>
    </section>
  `,
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersList: User[] = [];
  filteredUsersList: User[] = [];
  usersService: UsersService = inject(UsersService);
  
  ngOnInit() {
    this.usersService.getAllUsers().then((users: User[]) => {
      this.usersList = users;
      this.filteredUsersList = users;
    });
  }
  

  filterResults(id: string) {
    if (!id) this.filteredUsersList = this.usersList;
    this.filteredUsersList = this.usersList.filter((user: User) => user._id === id);
  }

}
