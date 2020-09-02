import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "app-user-dashboard-controls",
  templateUrl: "./user-dashboard-controls.component.html",
})
export class UserDashboardControlsComponent implements OnInit {


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
    if(index === 1){
     this.date.setDate(this.date.getDate()  + 7)
    }

     if(index === 0){
     this.date.setDate(this.date.getDate()  - 7)
    }

  }

   getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? - 6 : 1);


    return new Date(date.setDate(diff));
  }







}
