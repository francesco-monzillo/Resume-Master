import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../Interfaces/user';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <section class="listing">
      <h2 class="listing-name">{{ user.name }}</h2>
      <p class="listing-info">{{ user.email }}</p>
      <p class="listing-info , id_info">{{ user._id }}</p>
    </section>
  `,

  // Removed this link... it lead to nonsense routing (this same page... but with no data (this component needs a User, not only an id))
  // <a [routerLink]="['/users/details', user._id]">Learn more</a>
  
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() user!: User;

  ngOnInit() {
    if (this.user.name == "")
      this.user.name = "No name provided";
    if (this.user.email == "")
      this.user.email = "No email provided";
    if (this.user._id == "")
      this.user._id = "No ID provided";
  }

}
