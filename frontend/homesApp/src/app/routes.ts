import { Routes } from "@angular/router";
import { DefaultHomeComponent } from "./default-home/default-home.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { JobApplicationComponent } from "./job-application/job-application.component";

const routeConfig: Routes = [
    {
        path: "",
        component: DefaultHomeComponent,
        title: "Home Page"
    },
    {
        path: "users",
        component: UsersListComponent,
        title: "User List Page"
    },
    {
        path: "users/details/:id",
        component: UserDetailsComponent,
        title: "User Details Page"
    },
    {
        path: "create-resume",
        component: JobApplicationComponent,
        title: "Create Resume Page"
    }
];

export default routeConfig;