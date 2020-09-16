import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ScheduleService } from "src/app/services/schedule.service";
import { Shift } from "../../../models/shift.model";

import { NgForm } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
  selector: "app-timesheets",
  templateUrl: "./timesheets.component.html",
  styleUrls: ["./timesheets.component.scss"],
})
export class TimesheetsComponent implements OnInit {
  @Input() startDate: Date;

  userId: number;

  date: Date = new Date();
  today: Date = new Date();

  user: User[] = [];
  convertDate;
  startOfWeek;
  endOfWeek;
  shifts: Shift[] = [];

  loading = false;

  hours;
  shiftHours: number;
  updated: boolean = false;
  error: any;
  approved: boolean;
  approvedShifts: Shift[];

  finishTimeArray: number[] = [];
  startTimeArray: number[] = [];
  totalHoursSum: number;
  userPay: number;
  allShifts: Shift[];

  constructor(
    private scheduleService: ScheduleService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.convertDate = this.convert(this.today);
    this.startOfWeek = this.getStartOfWeek(this.date);
    this.endOfWeek = this.getEndOfWeek(this.date);

    this.scheduleService.currentUserId.subscribe((data) => {
      (this.userId = data), (this.loading = true);
    });

    this.scheduleService
      .getShiftsForDateRange(this.startOfWeek, this.endOfWeek)
      .subscribe(
        (data) => {
          this.allShifts = data;
        },
        (err) => {
          this.error = err;
        }
      );

    this.employeeService.getEmployeeDetails(this.userId).subscribe(
      (data) => {
        this.user = data;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getTotalHours(startTime, finishTime) {
    const start = parseInt(startTime);
    const finish = parseInt(finishTime);
    return finish - start;
  }

  convert(date) {
    var newDate = new Date(date),
      month = ("0" + (newDate.getMonth() + 1)).slice(-2),
      day = ("0" + newDate.getDate()).slice(-2),
      year = date.getFullYear();
    return [year, month, day].join("-");
  }

  setDay(day, startOfWeek) {
    const date = new Date(startOfWeek.setDate(startOfWeek.getDate() + day));
    return this.convert(date);
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  private getEndOfWeek(date: Date) {
    const endOfWeek = date.setDate(date.getDate() + 6);
    const newDate = new Date(endOfWeek);
    return this.convert(newDate);
  }

  shiftInfo(startTime, finishTime) {
    const start = parseInt(startTime);
    const finish = parseInt(finishTime);
    this.shiftHours = finish - start;
  }

  ngOnChanges() {
    this.convertDate = this.convert(this.today);
    this.shifts = [];

    this.scheduleService.currentUserId.subscribe((data) => {
      (this.userId = data),
        this.scheduleService
          .getDateRange(data, this.startOfWeek, this.endOfWeek)
          .subscribe((data) => {
            this.shifts = data;
          });
    });

    this.startOfWeek = this.getStartOfWeek(this.startDate);
    this.endOfWeek = this.getEndOfWeek(this.startDate);

    this.scheduleService
      .getShiftsForDateRange(this.startOfWeek, this.endOfWeek)
      .subscribe((data) => (this.allShifts = data));

    this.scheduleService
      .getDateRange(this.userId, this.startOfWeek, this.endOfWeek)
      .subscribe(
        (data) => {
          this.shifts = data;
        },
        (err) => {
          this.error = err;
        }
      );

    this.startOfWeek = this.getStartOfWeek(this.startDate);
    this.endOfWeek = this.getEndOfWeek(this.startDate);

    this.employeeService
      .getEmployeeDetails(this.userId)
      .subscribe((data) => {(this.user = data)}, err=> {
        this.error = err;
      });
  }

  changeHours(form: NgForm, shiftId: number) {
    if (form.invalid) {
      return;
    }
    const startTime = form.value.startTime;
    const finishTime = form.value.finishTime;

    this.scheduleService
      .updateShift(startTime, finishTime, shiftId)
      .subscribe();

    this.updated = true;
  }

  hide() {
    this.updated = false;
  }

  deleteShift(shiftId: number) {
    this.scheduleService.deleteShift(shiftId).subscribe(
      (data) => {
        console.log("shift deleted");
      },
      (err) => {
        this.error = err;
      }
    );

    this.scheduleService
      .getDateRange(this.userId, this.startOfWeek, this.endOfWeek)
      .subscribe(
        (data) => {
          this.shifts = data;
        },
        (err) => {
          this.error = err;
        }
      );

    /*
    this.scheduleService
      .getShiftsForDateRange(this.startOfWeek, this.endOfWeek)
      .subscribe((data) => (this.allShifts = data)); */
  }

  approve(shiftId: number) {
    this.shifts.forEach((shift) => {
      if (shift.id === shiftId) {
        this.shifts = this.shifts.filter((item) => item.id !== item.id);
      }
    });

    this.scheduleService.approveShift(shiftId).subscribe((data) => {
      this.scheduleService
        .getDateRange(this.userId, this.startOfWeek, this.endOfWeek)
        .subscribe((data) => {
          this.shifts.push(...data);
        });
    });

    this.allShifts.forEach((shift) => {
      if (shift.id === shiftId) {
        shift.approved === true;
      }
    });

    this.scheduleService
      .getShiftsForDateRange(this.startOfWeek, this.endOfWeek)
      .subscribe((data) => (this.allShifts = data));
  }

  getTotalPay(startTime, finishTime, userPay) {
    const parseStart = parseInt(startTime);
    const parseFinish = parseInt(finishTime);

    const hours = parseFinish - parseStart;

    return hours * userPay;
  }

  getTotalHoursForWeek() {
    this.shifts.forEach((item) => {
      this.startTimeArray.push(parseInt(item.startTime));
      this.finishTimeArray.push(parseInt(item.finishTime));
      this.userPay = item.User.pay;
    });

    const startTimeSum = this.startTimeArray.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );

    const finishTimeSum = this.finishTimeArray.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );

    this.startTimeArray = [];
    this.finishTimeArray = [];
    this.totalHoursSum = finishTimeSum - startTimeSum;

    return this.totalHoursSum;
  }

  getTotalPayForWeek() {
    return this.totalHoursSum * this.userPay;
  }

  getApprovedShifts() {
    let totalApprovedShifts = 0;

    this.shifts.forEach((item) => {
      if (item.approved === true) {
        totalApprovedShifts++;
      }
    });

    return totalApprovedShifts;
  }

  createShift(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.scheduleService
      .createShift(
        this.userId,
        form.value.startTime,
        form.value.finishTime,
        form.value.date,
        form.value.area
      )
      .subscribe((data) => {
        this.shifts.push(...data);
        this.allShifts.push(...data);
      });
  }
}
