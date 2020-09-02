import { Component, OnInit, Input } from "@angular/core";
import { HolidayService } from "src/app/services/holiday.service";
import { Holiday } from "src/app/models/user-holiday.model";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-user-holidays",
  templateUrl: "./user-holidays.component.html",
  styleUrls: ["./user-holidays.component.scss"],
})
export class UserHolidaysComponent implements OnInit {
  @Input() userId: number;

  error: string;
  holidays: Holiday[] = [];
  date: Date = new Date();
  convertDate;

  model: NgbDateStruct;

  today: boolean;
  futureHolidays: boolean = true;
  pastHolidays: boolean = true;

  constructor(private holidayService: HolidayService) {}

  ngOnInit(): void {
    this.convertDate = this.convert(this.date);

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

          if(element.date > this.convertDate){
            this.futureHolidays = false

          }

          if(element.date < this.convertDate){
            this.pastHolidays = false;
          }

        });
      },
      (error) => {
        this.error = error
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

  removeHoliday(id: number) {
    this.holidayService
      .deleteHoliday(id)
      .subscribe((data) => console.log(data));
    this.holidays = this.holidays.filter((item) => item.id !== id);
  }

  onSubmit(form: NgForm) {
    this.holidayService
      .createUserHoliday(form.value.date, this.userId)
      .subscribe(
        (data) => {
          const newData = [];
          newData.push(data);
          this.holidays.push(...newData)
        },
        (err) => {
          this.error = err;
        }
      );
  }

  closeAlert() {
    this.error = "";
  }
}
