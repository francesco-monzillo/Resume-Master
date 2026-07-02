import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Welcome to the Home Page</h1>
    <p>This is the home page of our Angular application. Here you can find various resources and links to navigate through the site.</p>
  `,
  styleUrls: ['./default-home.component.css']
})
export class DefaultHomeComponent {
  
}
