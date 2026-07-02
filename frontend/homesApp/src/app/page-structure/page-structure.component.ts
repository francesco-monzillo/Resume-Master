import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from '../users-list/users-list.component';
import { DefaultHomeComponent } from '../default-home/default-home.component';

@Component({
  selector: 'app-page-structure',
  standalone: true,
  imports: [CommonModule, RouterModule, UsersListComponent, DefaultHomeComponent],
  template: `

            <div class="content" id="content">

              <nav class = "sidenav">
                <ul class="navbar" id="navbar">
                  <li class="brand-name">
                    <img class = "brand-logo" src="assets/logo.svg" alt="logo" aria-hidden="true"> 
                  </li>
                  <li><a routerLink="./">Home</a></li>
                  <li><a routerLink="./users">Users List</a></li>
                  <li><a routerLink="./models">Models List</a></li>
                  <li><a routerLink="./create-resume">Create Resume</a></li>
                  <li><a routerLink="./about">About</a></li>
                </ul>
              </nav>

            
              <article class="selected_content">
                <router-outlet></router-outlet>
              </article>
            </div>
            `,
  styleUrls: ['./page-structure.component.css']
})
export class PageStructureComponent {

}
