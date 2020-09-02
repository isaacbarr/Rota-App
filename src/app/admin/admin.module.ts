import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeModule } from "./employees/employee.module";

import { AdminNavComponent } from "./admin-nav/admin-nav.component";
import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";

import { ScheduleModule } from "./schedule/schedule.module";
import { ProfileModule } from "../shared/profile/profile.module";
import { UserDashboardModule } from "../shared/user-dashboard/user-dashboard.module";
import { TimeSheetsModule } from "./timesheets/timesheets.module";
import { PayrollReportsModule } from "./payroll-reports/payroll-reports.module";


@NgModule({
  declarations: [AdminComponent, AdminNavComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    NgbModule,
    EmployeeModule,
    ScheduleModule,
    ProfileModule,
    UserDashboardModule,
    TimeSheetsModule,
    PayrollReportsModule,
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
