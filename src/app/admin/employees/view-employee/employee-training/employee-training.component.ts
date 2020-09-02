import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

import { Training } from "src/app/models/user-training.model";
import { NgForm } from "@angular/forms";
import { TrainingService } from "src/app/services/training.service";

@Component({
  selector: "app-employee-training",
  templateUrl: "./employee-training.component.html",

})
export class EmployeeTrainingComponent implements OnInit {
  @Input() userId;
  @Output() trainingAdded = new EventEmitter();

  training: Training[] = [];
  otherTraining: Training[] = [];
  error = "";

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingService.getTraining(this.userId).subscribe((data) => {
      this.training = data;

      data.forEach((item) => {
        if (
          item.training != "manager" &&
          item.training != "bar" &&
          item.training != "floor" &&
          item.training != "chef"
        ) {
          this.otherTraining.push(item);
        }
      });
    });
  }

  addArea(form: NgForm) {
    if (
      form.value.area === "manager" ||
      form.value.area === "floor" ||
      form.value.area === "bar" ||
      form.value.area === "chef"
    ) {
      this.trainingService
        .insertTrainingArea(this.userId, form.value.area)
        .subscribe(
          (data) => {
            this.training.push(...data)
            this.trainingAdded.emit(true);
            this.error = "Area added successfully";
          },
          (error) => {
            this.error = error;
          }
        );
    } else {
      this.error = "The area you have selected is not a created area";
    }


  }

  addOtherTrainingArea(form: NgForm) {
    this.otherTraining = [];

    if (form.invalid) {
      return;
    }

    this.trainingService
      .addOtherTrainingArea(this.userId, form.value.train, form.value.date)
      .subscribe(
        (data) => {
          this.trainingAdded.emit(true);
          this.error = "Area added successfully";
        },
        (error) => {
          this.error = error;
        }
      );

    this.trainingService.getTraining(this.userId).subscribe((data) => {
      this.otherTraining = data;
    });
  }
}
