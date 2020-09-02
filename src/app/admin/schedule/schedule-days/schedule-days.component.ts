import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: "app-schedule-days",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./schedule-days.component.html",
})
export class ScheduleDaysComponent implements OnInit {

  constructor(private service: ScheduleService){

  }
  days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];



  @Input()
  selected: number;
  date: Date;

  @Output()
  select = new EventEmitter<number>();
  button = new EventEmitter<any>();


  selectedDay(index: number) {
    this.select.emit(index);
  }



  ngOnInit(): void {}
}
