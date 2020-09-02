import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ViewEmployeeComponent } from "./view-employee.component";
import { ViewProfileComponent } from "./view-profile/view-profile.component";
import { EmployeeHolidayComponent } from "./employee-holiday/employee-holiday.component";
import { EmployeeTrainingComponent } from "./employee-training/employee-training.component";
import { EmployeeShiftsComponent } from "./employee-shifts/employee-shifts.component";

@NgModule({
  declarations: [
    ViewEmployeeComponent,
    EmployeeHolidayComponent,
    ViewProfileComponent,
    EmployeeTrainingComponent,
    EmployeeShiftsComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  exports: [ViewEmployeeComponent],
})
export class ViewEmployeeModule {}
