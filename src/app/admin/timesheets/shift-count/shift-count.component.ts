import { Component, OnInit, Input } from "@angular/core";
import { ScheduleService } from "src/app/services/schedule.service";
import { Shift } from "src/app/models/shift.model";

@Component({
  selector: "app-shift-count",
  templateUrl: "./shift-count.component.html",
})
export class ShiftCountComponent implements OnInit {
  @Input() shifts: Shift[] = [];
  @Input() startDate: Date;

  date: Date = new Date();
  today: Date = new Date();

  convertDate;
  startOfWeek;
  endOfWeek;
  //shifts: Shift[] = [];
  startTimeSum: number;
  test: number[] = [];
  startTimeArray: number[] = [];
  finishTimeArray: number[] = [];
  totalHoursSum: number;
  error: any;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.convertDate = this.convert(this.today);
    this.startOfWeek = this.getStartOfWeek(this.date);
    this.endOfWeek = this.getEndOfWeek(this.date);

    this.scheduleService
      .getShiftsForDateRange(this.startOfWeek, this.endOfWeek)
      .subscribe((data) => {
        this.shifts = data;
      }, err => {
        this.error = err;
      });

    this.getShiftCount();
    this.getApproval();
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
    this.convertDate = this.convert(this.today);
    this.startOfWeek = this.getStartOfWeek(this.startDate);
    this.endOfWeek = this.getEndOfWeek(this.startDate);

    this.getShiftCount();
    this.getApproval();
  }

  //gets total hours for all shifts per week
  getShiftCount() {
    this.shifts.forEach((item) => {
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

  //returns total amount of shifts per week
  getAmount() {
    return this.shifts.length;
  }

  getApproval() {
    let count = 0;
    this.shifts.forEach((shift) => {
      if (shift.approved != true && shift.date < this.convertDate) {
        count++;
      }
    });

    return count;
  }
}
