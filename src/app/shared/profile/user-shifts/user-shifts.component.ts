import { Component, OnInit, Input } from "@angular/core";
import { ScheduleService } from "src/app/services/schedule.service";
import { Shift } from "src/app/models/shift.model";
import { EmployeeService } from "src/app/services/employee.service";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-user-shifts",
  templateUrl: "./user-shifts.component.html",
  styleUrls: ["./user-shifts.component.scss"],
})
export class UserShiftsComponent implements OnInit {
  @Input() userId: number;

  shifts: Shift[] = [];
  user: User[] = [];
  date: Date = new Date();
  shiftHours: number;
  today: boolean = false;
  pay: number;
  shiftPay: number;
  error: string;
  convertDate;
  constructor(
    private scheduleService: ScheduleService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.convertDate = this.convert(this.date);

    this.scheduleService.getShiftsById(this.userId).subscribe(
      (data) => {
        (this.shifts = data),
          this.shifts.forEach((element) => {
            if (element.date != this.convertDate) {
            }
            if (element.date === this.convertDate) {
              this.today = true;
            }
          });
      },
      (error) => {
        this.error = error;
      }
    );

    this.employeeService.getEmployeeDetails(this.userId).subscribe(
      (data) => {
        data.forEach((item) => {
          this.pay = item.pay;
        });
      },
      (error) => {
        (this.error = error), console.log(error);
      }
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

  shiftInfo(startTime, finishTime) {
    const start = parseInt(startTime);
    const finish = parseInt(finishTime);

    this.shiftHours = finish - start;

    this.shiftPay = this.shiftHours * this.pay;
  }

  totalshiftHours(startTime, finishTime){
    const start = parseInt(startTime);
    const finish = parseInt(finishTime);
    return finish - start;

  }
}
