import { Component, OnInit, Input, OnChanges } from "@angular/core";
//drag and drop element
import {
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
} from "@angular/cdk/drag-drop";

import { Subscription } from "rxjs";

//services
import { ScheduleService } from "src/app/services/schedule.service";
import { EmployeeService } from "src/app/services/employee.service";
import { HolidayService } from "src/app/services/holiday.service";
//models
import { Shift } from "src/app/models/shift.model";
import { Holiday } from "src/app/models/user-holiday.model";
import { User } from "../../../../models/user.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-chef-area",
  templateUrl: "./chef-area.component.html",
  styleUrls: ["./chef-area.component.scss"],
})
export class ChefAreaComponent implements OnInit, OnChanges {
  @Input() selectedDate: Date;

  chefList = [];

  hide: boolean = true;

  removeEdit: boolean = true;
  hideTime: boolean = false;
  edit: boolean = false;
  delete: boolean = false;
  shiftId: number;
  created: boolean = false;
  userExists: boolean = false;
  userHoliday: boolean = false;


  subscriptions: Subscription[] = [];

  holidays: Holiday[] = [];
  users: User[] = [];
  chefShifts: Shift[] = [];
  shifts: Shift[] = [];
  setDate: Date[] = [];
  selectedDay: Date;

  convertDate;

  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  constructor(
    private scheduleService: ScheduleService,
    private employeeService: EmployeeService,
    private holidayService: HolidayService
  ) {}


  ngOnInit() {
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe((data) => {
        this.setDate = data;
      }),
    ];

    this.convertDate = this.convert(this.setDate);

    this.scheduleService.getShifts(this.convertDate).subscribe((data) => {
      this.chefShifts = data,

      console.log(this.chefShifts)
    });

    this.employeeService.getEmployees().subscribe((data) => {
      this.users = data;

    });

    this.holidayService
      .getHolidaysForDate(this.convertDate)
      .subscribe((data) => {
        this.holidays = data;

      });

    this.scheduleService.currentUserExists.subscribe((data) => {
      this.userExists = data;

    });

    this.holidayService.currentUserHoliday.subscribe((data) => {
      (this.userHoliday = data)
    });
  }




  ngOnChanges() {
    this.convertDate = this.convert(this.setDate);
    this.scheduleService.getShifts(this.convertDate).subscribe((data) => {
      this.chefShifts = data
    });

    this.holidayService
      .getHolidaysForDate(this.convertDate)
      .subscribe((data) => {
        this.holidays = data;
      });

    this.scheduleService.getShifts(this.convertDate).subscribe((data) => {
      this.chefShifts = data;
    });

    this.scheduleService.currentUserExists.subscribe(
      (data) => (this.userExists = data)
    );

    this.holidayService.currentUserHoliday.subscribe(
      (data) => (this.userHoliday = data)
    );

    this.chefList = [];
  }


  //convert date function
  convert(date) {
    var newDate = new Date(date),
      month = ("0" + (newDate.getMonth() + 1)).slice(-2),
      day = ("0" + newDate.getDate()).slice(-2),
      year = date.getFullYear();
    return [year, month, day].join("-");
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.created = false;

    const userData = event.container.data;
    let userId;

    userData.forEach((userData) => {
      userId = userData.id;
    });

    this.holidays.forEach((holiday) => {
      if (holiday.date === this.convertDate) {
        if (holiday.UserId === userId) {
          this.changeUserHoliday(true);
          this.chefList = this.chefList.filter((item) => item.id !== item.id);
        }
      }
    });

    this.shifts.forEach((user) => {
      if (user.User.id === userId) {
        this.changeUserExists(true);
        this.chefList = this.chefList.filter((item) => item.id !== item.id);
      }
    });
  }

  changeUserExists(value: boolean) {
    this.scheduleService.updateUserExists(value);
  }

  changeUserHoliday(value: boolean) {
    this.holidayService.updateUserHoliday(value);
  }

  remove(user: number) {
    this.chefList = this.chefList.filter((item) => item.id !== user);
  }

  deleteShift(shiftId: number) {
    this.scheduleService.deleteShift(shiftId).subscribe();
    this.chefShifts = this.chefShifts.filter((item) => item.id !== shiftId);
  }

  submitShift(userId: number, form: NgForm) {
    if (form.invalid) {
      return;
    }
    const date = this.convertDate;
    const startTime = form.value.startTime;
    const finishTime = form.value.finishTime;
    const area = "chef";

    this.scheduleService
      .createShift(userId, startTime, finishTime, date, area)
      .subscribe((data) =>{ this.chefShifts.push(...data)});

    this.chefList = [];
    this.created = true;
  }

  editShift(form: NgForm, shiftId: number) {
    const startTime = form.value.startTime;
    const finishTime = form.value.finishTime;

    //get item in array remove it and then replace with
    //updated shift
    this.chefShifts = this.chefShifts.filter((item) => item.id !== shiftId);

    this.scheduleService
      .updateShift(startTime, finishTime, shiftId)
      .subscribe((data) => this.chefShifts.push(...data));

    this.edit = false;
    this.removeEdit = true;
  }

  editButton(id: number) {
    this.edit = true;
    this.shiftId = id;
    this.removeEdit = false;
  }

  closeAlert() {
    this.userExists = false;
    this.userHoliday = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
