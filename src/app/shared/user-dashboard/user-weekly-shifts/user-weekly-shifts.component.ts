import { Component, OnInit, Input } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { User } from "src/app/models/user.model";
import { ScheduleService } from "src/app/services/schedule.service";
import { Shift } from "src/app/models/shift.model";

@Component({
  selector: "app-user-weekly-shifts",
  templateUrl: "./user-weekly-shifts.component.html",
})
export class UserWeeklyShiftsComponent implements OnInit {
  @Input() startDate;

  userId: number;
  user: User[] = [];
  error: string;
  shifts: Shift[] = [];
  date: Date = new Date();
  offset = 0;
  shiftInfo: Shift[] = [];

  convertDate;

  test: string;

  monday;
  tuesday;
  wednesday;
  thursday;
  friday;
  saturday;
  sunday;
  basicModal: any;
  shiftDetail: Shift[] = [];
  selectedDayIndex: any;
  startTimeArray: number[] = [];
  finishTimeArray: number[] = [];
  totalHoursSum: number;

  constructor(
    private employeeService: EmployeeService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.convertDate = this.convert(this.date);
    this.userId = JSON.parse(localStorage.getItem("userId"));

    this.employeeService.getEmployee(this.userId).subscribe(
      (data) => {
        this.user = data;
      },
      (err) => {
        this.error = err;
      }
    );

    this.scheduleService.getShiftsById(this.userId).subscribe(
      (data) => {

        this.shifts = data;
      },
      (err) => {
        this.error = err;
      }
    );

    let startOfWeek = this.getStartOfWeek(this.date);
    this.monday = this.setDay(0, startOfWeek);
    this.tuesday = this.setDay(1, startOfWeek);
    this.wednesday = this.setDay(1, startOfWeek);
    this.thursday = this.setDay(1, startOfWeek);
    this.friday = this.setDay(1, startOfWeek);
    this.saturday = this.setDay(1, startOfWeek);
    this.sunday = this.setDay(1, startOfWeek);

    this.scheduleService
      .getDateRange(this.userId, this.monday, this.sunday)
      .subscribe(
        (data) => {
          this.shiftInfo = data;
        },
        (error) => {
          this.error = error;
        }
      );
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

  details(shift) {
    this.scheduleService.getShifts(shift).subscribe(
      (data) => {
        this.shiftDetail = data;
      },
      (error) => {
        this.error = error;

      }
    );
  }

  getTotalHours(startTime, finishTime) {
    const start = parseInt(startTime);
    const finish = parseInt(finishTime);

    return finish - start;
  }

  hideModal() {
    this.shiftDetail = [];
  }

  ngOnChanges() {
    this.monday = this.setDay(0, this.startDate);
    this.tuesday = this.setDay(1, this.startDate);
    this.wednesday = this.setDay(1, this.startDate);
    this.thursday = this.setDay(1, this.startDate);
    this.friday = this.setDay(1, this.startDate);
    this.saturday = this.setDay(1, this.startDate);
    this.sunday = this.setDay(1, this.startDate);

    this.scheduleService
      .getDateRange(this.userId, this.monday, this.sunday)
      .subscribe(
        (data) => {
          this.shiftInfo = data;
        },
        (error) => {
          this.error = error;
        }
      );
  }

  getShiftCount() {
    this.shiftInfo.forEach((item) => {
      this.startTimeArray.push(parseInt(item.startTime));
      this.finishTimeArray.push(parseInt(item.finishTime));
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
    return (this.totalHoursSum = finishTimeSum - startTimeSum);
  }
}
