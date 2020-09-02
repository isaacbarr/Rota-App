import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { TimeSheetsDashComponent } from "./timesheets-dash.component";
import { TimesheetControlsComponent } from "./timesheet-controls/timesheet-controls.component";
import { TimesheetsComponent } from "./timesheets/timesheets.component";

import { UsersComponent } from "./users/users.component";
import { ShiftCountComponent } from "./shift-count/shift-count.component";

@NgModule({
  declarations: [
    TimeSheetsDashComponent,
    TimesheetControlsComponent,
    TimesheetsComponent,
    UsersComponent,
    ShiftCountComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  exports: [TimeSheetsDashComponent],
})
export class TimeSheetsModule {}
