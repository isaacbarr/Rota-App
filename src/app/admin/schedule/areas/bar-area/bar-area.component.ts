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
  selector: "app-bar-area",
  templateUrl: "./bar-area.component.html",
  styleUrls: ["../manager-area/manager-area.component.scss"],
})
export class BarAreaComponent implements OnInit, OnChanges {
  @Input() selectedDate: Date;

  barList = [];

  hide: boolean = true;
  removeEdit: boolean = true;
  hideTime: boolean = false;
  edit: boolean = false;
  delete: boolean = false;
  shiftId: number;
  created: boolean = false;
  userExists: boolean = false;
  userHoliday: boolean = false;
  subscriptions: Subscription[] = [];
  holidays: Holiday[] = [];
  users: User[] = [];

  barShifts: Shift[] = [];
  shifts: Shift[] = [];
  setDate: Date[] = [];
  selectedDay: Date;
  loading: boolean = false;

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
    this.loading = true;
    this.scheduleService.schedule$.subscribe((data) => {
      this.setDate = data;
    });

    this.convertDate = this.convert(this.setDate);

    this.scheduleService.getShifts(this.convertDate).subscribe(
      (data) => {
        (this.shifts = data),
          data.forEach((shift) => {
            if (shift.area === "bar") {
              this.barShifts.push(shift);
            }
          });
      },
      (err) => {
        this.error = err;
      }
    );

    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.users = data;
        this.loading = false;
      },
      (err) => {
        this.error = err;
      }
    );

    this.holidayService.getHolidaysForDate(this.convertDate).subscribe(
      (data) => {
        this.holidays = data;
        this.loading = false;
      },
      (err) => {
        this.error = err;
      }
    );

    this.scheduleService.currentUserExists.subscribe(
      (data) => {
        this.userExists = data;
        this.loading = false;
      },
      (err) => {
        this.error = err;
      }
    );

    this.holidayService.currentUserHoliday.subscribe(
      (data) => {
        (this.userHoliday = data), (this.loading = false);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  ngOnChanges() {
    this.convertDate = this.convert(this.setDate);
    this.scheduleService.getShifts(this.convertDate).subscribe(
      (data) => {
        this.barShifts = data;
      },
      (err) => {
        this.error = err;
      }
    );

    this.holidayService.getHolidaysForDate(this.convertDate).subscribe(
      (data) => {
        this.holidays = data;
      },
      (err) => {
        this.error = err;
      }
    );

    this.scheduleService.getShifts(this.convertDate).subscribe(
      (data) => {
        this.barShifts = data;
      },
      (err) => {
        this.error = err;
      }
    );

    this.scheduleService.currentUserExists.subscribe(
      (data) => (this.userExists = data)
    );

    this.holidayService.currentUserHoliday.subscribe(
      (data) => (this.userHoliday = data)
    );

    this.barList = [];
  }

  //convert date function
  convert(date) {
    let newDate = new Date(date),
      month = ("0" + (newDate.getMonth() + 1)).slice(-2),
      day = ("0" + newDate.getDate()).slice(-2),
      year = date.getFullYear();
    return [year, month, day].join("-");
  }

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
          this.barList = this.barList.filter((item) => item.id !== item.id);
        }
      }
    });

    //check if not already working
    this.shifts.forEach((user) => {
      if (user.User.id === userId) {
        this.changeUserExists(true);
        this.barList = this.barList.filter((item) => item.id !== item.id);
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
    this.barList = this.barList.filter((item) => item.id !== user);
  }

  deleteShift(shiftId: number) {
    this.scheduleService.deleteShift(shiftId).subscribe(),
      (err) => {
        this.error = err;
      };
    this.barShifts = this.barShifts.filter((item) => item.id !== shiftId);
  }

  submitShift(userId: number, form: NgForm) {
    if (form.invalid) {
      return;
    }
    //get date
    const date = this.convertDate;
    //get start time
    const startTime = form.value.startTime;
    //get finish time
    const finishTime = form.value.finishTime;
    //set area
    const area = "bar";

    this.scheduleService
      .createShift(userId, startTime, finishTime, date, area)
      .subscribe(
        (data) => {
          this.barShifts.push(...data);
        },
        (err) => {
          this.error = err;
        }
      );

    this.barList = [];
    this.created = true;
  }

  editShift(form: NgForm, shiftId: number) {
    const startTime = form.value.startTime;
    const finishTime = form.value.finishTime;

    //get item in array remove it and then replace with
    //updated shift
    this.barShifts = this.barShifts.filter((item) => item.id !== shiftId);

    this.scheduleService.updateShift(startTime, finishTime, shiftId).subscribe(
      (data) => {
        this.barShifts.push(...data);
      },
      (err) => {
        this.error = err;
      }
    );

    this.edit = false;
    this.removeEdit = true;
  }

  editButton(id: number) {
    this.edit = true;
    this.shiftId = id;
    this.removeEdit = false;
  }

  closeAlert() {
    this.userExists = false;
    this.userHoliday = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
