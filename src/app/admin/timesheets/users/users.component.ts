import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { User } from "src/app/models/user.model";
import { ScheduleService } from "src/app/services/schedule.service";
import { Shift } from "src/app/models/shift.model";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
})
export class UsersComponent implements OnInit {
  @Input() startDate;

  date: Date = new Date();
  users: User[] = [];
  shifts: Shift[] = [];
  startOfWeek;
  endOfWeek;
  shiftHours: number;
  totalWeeklyHours: number;

  userId: number;

  @Output()
  selectedUserId = new EventEmitter<number>();
  getTotalHours = [];

  constructor(
    private employeeService: EmployeeService,
    private shiftService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.startOfWeek = this.getStartOfWeek(this.date);
    this.endOfWeek = this.getEndOfWeek(this.date);

    this.employeeService.getEmployees().subscribe((data) => {
      this.users = data;
    });

    this.shiftService.currentUserId.subscribe((id) => {
      this.userId = id;
    });
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

  ngOnChanges() {
    this.startOfWeek = this.getStartOfWeek(this.startDate);
    this.endOfWeek = this.getEndOfWeek(this.startDate);

    this.employeeService.getEmployees().subscribe((data) => {
      this.users = data;
    });

    this.shiftService
      .getShiftsForDateRange(this.startOfWeek, this.endOfWeek)
      .subscribe((data) => {
        this.shifts.push(...data);
      });
  }

  openInfo(userId: number) {
    this.shiftService.changeUserId(userId);
    this.selectedUserId.emit(userId);
  }
}
