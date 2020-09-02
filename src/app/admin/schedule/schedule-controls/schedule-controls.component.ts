import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
} from "@angular/core";

@Component({
  selector: "app-schedule-controls",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./schedule-controls.component.html",
})
export class ScheduleControlsComponent implements OnInit {
  offset = 0;

  @Input()
  selected: Date;

  @Output()
  move = new EventEmitter<number>();

  ngOnInit(): void {}

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }
}
