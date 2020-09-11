import { Component, OnInit } from "@angular/core";
import { HolidayService } from "src/app/services/holiday.service";
import { ScheduleService } from "src/app/services/schedule.service";

@Component({
  selector: "app-area-error-handler",
  templateUrl: "./area-error-handler.component.html",
})
export class AreaErrorHandlerComponent implements OnInit {
  userExists: boolean;
  userHoliday: boolean;

  constructor(
    private scheduleService: ScheduleService,
    private holidayService: HolidayService
  ) {}

  ngOnInit() {
    this.scheduleService.currentUserExists.subscribe(
      (data) => (this.userExists = data)
    );

    this.holidayService.currentUserHoliday.subscribe(
      (data) => (this.userHoliday = data)
    );
  }

  ngOnChanges() {
    this.scheduleService.currentUserExists.subscribe(
      (data) => (this.userExists = data)
    );

    this.holidayService.currentUserHoliday.subscribe(
      (data) => (this.userHoliday = data)
    );
  }

  closeAlert() {
    this.userExists = false;
    this.userHoliday = false;
  }















































}

