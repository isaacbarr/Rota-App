import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { User } from "src/app/models/user.model";
import { NgForm } from "@angular/forms";
import { ScheduleService } from "src/app/services/schedule.service";
import { Shift } from "src/app/models/shift.model";

@Component({
  selector: "app-payroll-reports-controls",
  templateUrl: "./payroll-reports-controls.component.html",

})
export class PayrollReportsControlsComponent implements OnInit {
  user: User[] = [];
  shifts: Shift[] = [];
  error: string = "";
  showReport: boolean = false;

  userReport: User[] = [];
  shiftHours: number;
  startTimeArray: number[] = [];
  finishTimeArray: number[] = [];
  totalHoursSum: number;
  userPay: number;

  constructor(
    private employeeService: EmployeeService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  headElements = [
    "Name",
    "Date",
    "Area",
    "Start Time",
    "Finish Time",
    "Hours",
    "Pay",
  ];

  getReports(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.showReport = true;

    if (form.value.users === "all") {
      this.scheduleService
        .getShiftsForDateRange(form.value.startDate, form.value.endDate)
        .subscribe((data) => (this.shifts = data));
    } else {
      this.scheduleService
        .getDateRange(
          form.value.users,
          form.value.startDate,
          form.value.endDate
        )
        .subscribe(
          (data) => {
            this.shifts = data;
          },
          (error) => {
            this.error = error;
          }
        );
    }
  }

  getTotalHours(startTime, endTime) {
    const start = parseInt(startTime);
    const finish = parseInt(endTime);

    return (this.shiftHours = finish - start);
  }

  getShiftPay(startTime, finishTime, pay) {
    const start = parseInt(startTime);
    const finish = parseInt(finishTime);

    this.shiftHours = finish - start;
    this.userPay = pay;
    return this.shiftHours * pay;
  }

  getTotalHoursForDateRange() {
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

  getTotalPayForDateRange() {
    return this.totalHoursSum * this.userPay;
  }
}
