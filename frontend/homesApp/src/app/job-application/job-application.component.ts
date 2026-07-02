import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { UsersService } from '../Services/users.service';
import { User } from '../Interfaces/user';
import { FormControl, FormGroup } from '@angular/forms';
import { Organization } from '../Interfaces/organization';
import { OrganizationsService } from '../Services/organizations.service';
import { CreateResumeComponent } from '../create-resume/create-resume.component';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [CommonModule, CreateResumeComponent],
  template: `

    <button id = "back-link" class="back-link" *ngIf="showChat" (click)="switch()"><strong>Back</strong></button>

    <div id = "job-application-container" class="job-application-container" *ngIf="showForm">

      <div id = "job-application" class="job-application">
        <h2>User Profile</h2>
          <select #selectedUser (change) = onSelectUser(selectedUser.value)>
            <option disabled selected value="">Select a user</option>
            <option *ngFor ="let user of userList" value = "{{ user._id }}"> {{ user.name }} </option>\
          </select>

          <select #selectedOrganization (change) = onSelectOrganization(selectedOrganization.value)>
            <option disabled selected value="">Select an organization</option>
            <option *ngFor = "let org of organizationList" value = "{{ org._id }}"> {{ org.name }} </option>\
          </select>

          <h3>Job Description</h3>
          <textarea #jobDescription rows="20" cols="80" placeholder="Enter job description..." ></textarea>

          <h3>Job Role</h3>
          <input type="text" placeholder="Enter job role..." #jobRole>

          <button class="primary" type="submit" (click)="submitApplication()">Apply Now</button>
      </div>

    </div>

    <app-create-resume *ngIf="showChat" [userHistory]="selectedUser?.history" [organization]="organization" [jobDescription]="jobDescription.nativeElement.value" [jobRole]="jobRole.nativeElement.value"></app-create-resume>
  `,
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit {
  userService: UsersService = inject(UsersService);
  organizationService: OrganizationsService = inject(OrganizationsService);

  userList: User[] = [];
  organizationList: Organization[] = [];

  userHistory: History | undefined = undefined;
  organization: Organization | undefined = undefined;

  @ViewChild('jobDescription') jobDescription!: ElementRef;
  @ViewChild('jobRole') jobRole!: ElementRef;

  showForm = true;
  showChat = false;

  /*applyForm = new FormGroup({
    userID: new FormControl(''),
    organizationID: new FormControl(''),
  });*/

  selectedUser: User | undefined = undefined;

  ngOnInit(){
    this.userService.getAllUsers().then((users: User[]) => {
      this.userList = users;
    });

    this.organizationService.getAllOrganizations().then((orgs: Organization[]) => {
      this.organizationList = orgs;
    });
  }

  onSelectUser(userId: string) {

    if (userId === "") {
      this.selectedUser = undefined;
    }

    const selectedUser = this.userList.find((user: User) => user._id === userId);
    this.selectedUser = selectedUser;
  }

  onSelectOrganization(orgId: string) {

    if (orgId === "") {
      this.organization = undefined;
    }
    
    const selectedOrg = this.organizationList.find((org: Organization) => org._id === orgId);
    this.organization = selectedOrg;
  }

  switch() {
    this.showForm = !this.showForm;
    this.showChat = !this.showChat;
  }

  submitApplication() {

    const jobDescription = this.jobDescription.nativeElement.value
    const jobRole = this.jobRole.nativeElement.value

    if (this.selectedUser != undefined && this.organization != undefined && jobDescription.length > 100 && jobRole !== "") {
      this.switch()
    }
  }

}
