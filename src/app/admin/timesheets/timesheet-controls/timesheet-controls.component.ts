import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-timesheet-controls",
  templateUrl: "./timesheet-controls.component.html",

})
export class TimesheetControlsComponent implements OnInit {
  date: Date = new Date();

  offset = 0;
  selectedDay: Date;
  selectedDayIndex: number;
  selectedWeek: Date;

  selectedDate: Date;

  @Output()
  move = new EventEmitter<number>();

  ngOnInit(): void {}

  moveDate(offset: number, index: number) {
    this.offset = offset;
    this.move.emit(offset);
    if (index === 1) {
      this.date.setDate(this.date.getDate() + 7);
    }

    if (index === 0) {
      this.date.setDate(this.date.getDate() - 7);
    }
  }

  convert(date) {
    var newDate = new Date(date),
      month = ("0" + (newDate.getMonth() + 1)).slice(-2),
      day = ("0" + newDate.getDate()).slice(-2),
      year = date.getFullYear();
    return [year, month, day].join("-");
  }

  getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
  }

  getEndOfWeek(date: Date) {
    const endOfWeek = date.setDate(date.getDate() + 6);
    const newDate = new Date(endOfWeek);
    return this.convert(newDate);
  }
}
