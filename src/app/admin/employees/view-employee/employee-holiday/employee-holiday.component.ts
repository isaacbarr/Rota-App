import { Component, OnInit, Input } from "@angular/core";
import { Holiday } from "src/app/models/user-holiday.model";
import { HolidayService } from "src/app/services/holiday.service";

@Component({
  selector: "app-employee-holiday",
  templateUrl: "./employee-holiday.component.html",
  styleUrls: [
    "../../../../admin/schedule/areas/manager-area/manager-area.component.scss",
  ],
})
export class EmployeeHolidayComponent implements OnInit {
  @Input() userId;
  holidays: Holiday[] = [];

  date: Date = new Date();
  convertDate: string;
  today: boolean;
  futureHolidays: boolean = true;
  pastHolidays: boolean = true;
  error: string = "";

  constructor(private holidayService: HolidayService) {}

  ngOnInit(): void {
    this.convertDate = this.convert(this.date);
    console.log(this.futureHolidays);
    this.holidayService.getHolidaysForUser(this.userId).subscribe(
      (data) => {
        (this.holidays = data),
          data.forEach((element) => {
            if (element.date != this.convertDate) {
              this.today = false;
            }
            if (element.date === this.convertDate) {
              this.today = true;
            }

            if (element.date > this.convertDate) {
              this.futureHolidays = false;
            }

            if (element.date < this.convertDate) {
              this.pastHolidays = false;
            }
          });
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
}
