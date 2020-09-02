import { Component, OnInit, Input } from "@angular/core";
import { ScheduleService } from "src/app/services/schedule.service";
import { Shift } from "src/app/models/shift.model";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
  selector: "app-employee-shifts",
  templateUrl: "./employee-shifts.component.html",

})
export class EmployeeShiftsComponent implements OnInit {
  @Input() userId;
  shifts: Shift[] = [];
  error: string;

  headElements = ["Date", "Start Time", "Finish Time", "Area", "Total Hours", "Total Pay"];
  shiftHours: number;
  shiftPay: number;
  pay: number;

  constructor(
    private scheduleService: ScheduleService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.scheduleService.getShiftsById(this.userId).subscribe(
      (data) => {
        this.shifts = data;
      },
      (error) => {
        this.error;
      }
    );
    this.employeeService.getEmployeeDetails(this.userId).subscribe(
      (data) => {
        data.forEach((item) => {
          this.pay = item.pay;
        });
      },
      (error) => {
        this.error;
      }
    );
  }

  shiftInfo(startTime, finishTime) {
    const start = parseInt(startTime);
    const finish = parseInt(finishTime);

    this.shiftHours = finish - start;

    return this.shiftHours * this.pay;
  }

  totalShiftHours(startTime, finishTime){
    const start = parseInt(startTime);
    const finish = parseInt(finishTime);

   return this.shiftHours = finish - start;
  }
}
