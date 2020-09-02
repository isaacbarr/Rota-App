import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProfileComponent } from "./profile.component";
import { UserHolidaysComponent } from "./user-holidays/user-holidays.component";
import { UserInformationComponent } from "./user-information/user-information.component";
import { UserShiftsComponent } from "./user-shifts/user-shifts.component";
import { UserTrainingComponent } from "./user-training/user-training.component";

@NgModule({
  declarations: [
    ProfileComponent,
    UserHolidaysComponent,
    UserInformationComponent,
    UserShiftsComponent,
    UserTrainingComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
