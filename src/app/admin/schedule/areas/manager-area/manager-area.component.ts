import { Component, OnInit, Input, OnChanges } from "@angular/core";

import {
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
} from "@angular/cdk/drag-drop";

import { Subscription } from "rxjs";

import { ScheduleService } from "src/app/services/schedule.service";
import { EmployeeService } from "src/app/services/employee.service";
import { HolidayService } from "src/app/services/holiday.service";

import { Shift } from "src/app/models/shift.model";
import { Holiday } from "src/app/models/user-holiday.model";
import { User } from "../../../../models/user.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-manager-area",
  templateUrl: "./manager-area.component.html",
  styleUrls: ["./manager-area.component.scss"],
})
export class ManagerAreaComponent implements OnInit, OnChanges {
  @Input() selectedDate: Date;

  managerList = [];

  hide: boolean = true;

  removeEdit: boolean = true;
  hideTime: boolean = false;
  edit: boolean = false;
  delete: boolean = false;
  shiftId: number;
  created: boolean = false;
  userExists: boolean = false;
  userHoliday: boolean = false;

  test: [];
  subscriptions: Subscription[] = [];

  holidays: Holiday[] = [];
  users: User[] = [];
  shifts: Shift[] = [];
  setDate: Date[] = [];
  selectedDay: Date;

  convertDate;
  error: string = "";

  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  constructor(
    private scheduleService: ScheduleService,
    private employeeService: EmployeeService,
    private holidayService: HolidayService
  ) {}

  ngOnInit() {
    this.changeUserExists(false);
    this.changeUserHoliday(false);

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe((data) => {
        this.setDate = data;
      }),
    ];

    this.convertDate = this.convert(this.setDate);

    this.scheduleService.getShifts(this.convertDate).subscribe((data) => {
      this.shifts = data;
    });

    this.employeeService.getEmployees().subscribe((data) => {
      this.users = data;
    });

    this.holidayService
      .getHolidaysForDate(this.convertDate)
      .subscribe((data) => {
        this.holidays = data;
      });

    this.scheduleService.currentUserExists.subscribe((data) => {
      this.userExists = data;
    });

    this.holidayService.currentUserHoliday.subscribe(
      (data) => (this.userHoliday = data)
    );
  }

  ngOnChanges() {
    //convert date so that db can be queried
    this.convertDate = this.convert(this.setDate);

    //get shifts for updated date
    this.scheduleService.getShifts(this.convertDate).subscribe(
      (data) => {
        //set shifts = data
        this.shifts = data;
      },
      (err) => {
        //error
        this.error = err;
      }
    );

    this.holidayService
      .getHolidaysForDate(this.convertDate)
      .subscribe((data) => {
        this.holidays = data;
      });

    this.scheduleService.getShifts(this.convertDate).subscribe((data) => {
      this.shifts = data;
    });

    this.scheduleService.currentUserExists.subscribe((data) => {
      this.userExists = data;
    });

    this.holidayService.currentUserHoliday.subscribe(
      (data) => (this.userHoliday = data)
    );
  }

  //convert date function
  convert(date) {
    var newDate = new Date(date),
      month = ("0" + (newDate.getMonth() + 1)).slice(-2),
      day = ("0" + newDate.getDate()).slice(-2),
      year = date.getFullYear();
    return [year, month, day].join("-");
  }

  //drag and drop function
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

    this.created = false;
    const userData = event.container.data;
    let userId;

    userData.forEach((userData) => {
      userId = userData.id;
    });

    this.holidays.forEach((holiday) => {
      if (holiday.date === this.convertDate) {
        if (holiday.UserId === userId) {
          this.changeUserHoliday(true);
          this.managerList = this.managerList.filter(
            (item) => item.id !== item.id
          );
        }
      }
    });

    this.shifts.forEach((user) => {
      if (user.User.id === userId) {
        this.changeUserExists(true);
        this.managerList = this.managerList.filter(
          (item) => item.id !== item.id
        );
      }
    });
  }

  changeUserExists(value: boolean) {
    this.scheduleService.updateUserExists(value);
  }

  changeUserHoliday(value: boolean) {
    this.holidayService.updateUserHoliday(value);
  }

  remove(user: number) {
    this.managerList = this.managerList.filter((item) => item.id !== user);
  }

  deleteShift(shiftId: number) {
    this.scheduleService.deleteShift(shiftId).subscribe();
    this.shifts = this.shifts.filter((item) => item.id !== shiftId);
  }

  submitShift(userId: number, form: NgForm) {
    if (form.invalid) {
      return;
    }

    const date = this.convertDate;
    const startTime = form.value.startTime;
    const finishTime = form.value.finishTime;
    let area = "manager";

    this.scheduleService
      .createShift(userId, startTime, finishTime, date, area)
      .subscribe((data) => {
        this.shifts.push(...data);
      });

    this.managerList = [];
    this.created = true;
  }

  editShift(form: NgForm, shiftId: number) {
    const startTime = form.value.startTime;
    const finishTime = form.value.finishTime;

    //get item in array remove it and then replace with
    //updated shift
    this.shifts = this.shifts.filter((item) => item.id !== shiftId);

    this.scheduleService
      .updateShift(startTime, finishTime, shiftId)
      .subscribe((data) => this.shifts.push(...data));

    this.edit = false;
    this.removeEdit = true;
  }

  editButton(id: number) {
    this.edit = true;
    this.shiftId = id;
    this.removeEdit = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
