import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Subscription } from "rxjs";
import { ScheduleService } from "../../services/schedule.service";
import { Store } from "../../store";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;
  subscriptions: Subscription[] = [];

  setDate: Date[];
  selectedDay: Date;

  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  constructor(private scheduleService: ScheduleService, private store: Store) {}

  ngOnInit() {
    this.date$ = this.store.select("date");
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe((data) => {
        this.setDate = data;
      }),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
