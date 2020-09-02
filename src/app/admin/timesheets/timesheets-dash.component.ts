import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-timesheet-dash",
  templateUrl: "./timesheets-dash.component.html",
})
export class TimeSheetsDashComponent implements OnInit {
  date: Date = new Date();
  offset = 0;
  selectedDay: Date;
  selectedDayIndex: number;
  selectedWeek: Date;

  selectedDate: Date;

  startDate: Date;

  @Output()
  change = new EventEmitter<Date>();

  userId: number;

  constructor() {}

  ngOnInit(): void {}

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  private getToday(date: Date) {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }

  selectUser(userId: number) {
    this.userId = userId;
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate()
    );
    startDate.setDate(startDate.getDate() + weekOffset * 7);

    this.change.emit(startDate);

    this.startDate = startDate;
  }

  ngOnChanges() {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }
}
