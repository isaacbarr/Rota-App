import { Component, OnInit, Input } from "@angular/core";
import { TrainingService } from "src/app/services/training.service";
import { Training } from "../../../models/user-training.model";

@Component({
  selector: "app-user-training",
  templateUrl: "./user-training.component.html",
})
export class UserTrainingComponent implements OnInit {
  @Input() userId: number;
  training: Training[] = [];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingService
      .getTraining(this.userId)
      .subscribe((data) => (this.training = data));
  }
}
