import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { UserDashboardComponent } from "./user-dashboard.component";

import { UserWeeklyShiftsComponent } from "./user-weekly-shifts/user-weekly-shifts.component";
import { UserDashboardControlsComponent } from "./user-dashboard-controls/user-dashboard-controls.component";
import { UserWelcomeComponent } from './user-welcome/user-welcome.component'
@NgModule({
  declarations: [
    UserDashboardComponent,
    UserDashboardControlsComponent,
    UserWeeklyShiftsComponent,
    UserWelcomeComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  exports: [UserDashboardComponent],
})
export class UserDashboardModule {}
