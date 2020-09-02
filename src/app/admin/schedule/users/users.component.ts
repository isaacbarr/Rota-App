import { Component, OnInit, Input } from "@angular/core";

import {
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
} from "@angular/cdk/drag-drop";

import { User } from "src/app/models/user.model";
import { EmployeeService } from "src/app/services/employee.service";
import { HolidayService } from "src/app/services/holiday.service";
import { ScheduleService } from "src/app/services/schedule.service";
import { Holiday } from "src/app/models/user-holiday.model";

import { Shift } from "src/app/models/shift.model";
import { TrainingService } from 'src/app/services/training.service';
import { Training } from 'src/app/models/user-training.model';

@Component({
  selector: "app-users-schedule",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UserComponent implements OnInit {
  @Input() selectedDate: Date;

  today: Date = new Date();

  userList: User[] = [];
  holidays: Holiday[] = [];
  shifts: Shift[] = [];
  training: Training[] = [];
  selectedDay: Date;
  setDate: Date[] = [];

  convertDate;

  constructor(
    private employeeService: EmployeeService,
    private holidayService: HolidayService,
    private scheduleService: ScheduleService,
    private trainingService : TrainingService
  ) {}

  ngOnInit(): void {
    this.convertDate = this.convert(this.today);

    this.scheduleService.schedule$.subscribe((data) => {
      this.setDate = data;
    });

    this.employeeService.getEmployees().subscribe((data) => {
      this.userList = data;
    });

    this.holidayService
      .getHolidaysForDate(this.convertDate)
      .subscribe((data) => {
        this.holidays = data;
      });


  }

  convert(date) {
    var newDate = new Date(date),
      month = ("0" + (newDate.getMonth() + 1)).slice(-2),
      day = ("0" + newDate.getDate()).slice(-2),
      year = date.getFullYear();
    return [year, month, day].join("-");
  }

  //drop from user into days
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  UserClicked(userId: number) {
    this.holidayService.getHolidaysForUser(userId).subscribe((data) => {
      this.holidays = data;
    });

    this.scheduleService.getShiftsById(userId).subscribe((data) => {
      this.shifts = data;
    });

    this.trainingService.getTraining(userId).subscribe(data => {
      this.training = data;
    })
  }
}
