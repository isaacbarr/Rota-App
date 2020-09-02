import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { ScheduleService } from "../../services/schedule.service";
import { ScheduleComponent } from "./schedule.component";
import { ScheduleControlsComponent } from "./schedule-controls/schedule-controls.component";
import { ScheduleCalendarComponent } from "./schedule-calendar/schedule-calendar.component";
import { ScheduleDaysComponent } from "./schedule-days/schedule-days.component";
import { UserComponent } from "./users/users.component";
import { ManagerAreaComponent } from "./areas/manager-area/manager-area.component";
import { BarAreaComponent } from "./areas/bar-area/bar-area.component";
import { FloorAreaComponent } from "./areas/floor-area/floor-area.component";
import { ChefAreaComponent } from "./areas/chef-area/chef-area.component";
import { AreaErrorHandlerComponent } from './areas/area-error-handler/area-error-handler.component';

@NgModule({
  declarations: [
    ScheduleComponent,
    ManagerAreaComponent,
    UserComponent,
    ScheduleControlsComponent,
    ScheduleCalendarComponent,
    ScheduleDaysComponent,
    BarAreaComponent,
    FloorAreaComponent,
    ChefAreaComponent,
    AreaErrorHandlerComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    DragDropModule,
  ],
  exports: [ScheduleComponent],
  providers: [ScheduleService],
})
export class ScheduleModule {}
