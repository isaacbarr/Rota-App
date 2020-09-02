import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "../shared/profile/profile.component";
import { UserComponent } from "./user.component";
import { UserDashboardComponent } from '../shared/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "",
    component: UserComponent,
    children: [
      //user  home
      { path: "", component: UserDashboardComponent},
      //profile
      { path: "profile", component: ProfileComponent },
      //redirect
      { path: "", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  //this takes our root route config
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
