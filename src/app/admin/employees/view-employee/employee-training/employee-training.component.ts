import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

import { Training } from "src/app/models/user-training.model";
import { NgForm } from "@angular/forms";
import { TrainingService } from "src/app/services/training.service";

@Component({
  selector: "app-employee-training",
  templateUrl: "./employee-training.component.html",
  styleUrls: [
    "../../../../shared/profile/user-holidays/user-holidays.component.scss",
  ],
})
export class EmployeeTrainingComponent implements OnInit {
  @Input() userId;
  @Output() trainingAdded = new EventEmitter();

  training: Training[] = [];
  otherTraining: Training[] = [];
  error = "";
  alertError: boolean = false

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
            console.log(data);
            let newDate = [];
            newDate.push(data);
            this.training.push(...newDate);
            this.trainingAdded.emit(true);
            this.error = "Area added successfully";
            this.alertError = true;
          },
          (error) => {
            this.error = error;
            this.alertError = true;
          }
        );
    } else {
      this.error = "The area you have selected is not a created area";
    }
  }

  addOtherTrainingArea(form: NgForm) {


    if (form.invalid) {
      return;
    }

    this.trainingService
      .addOtherTrainingArea(this.userId, form.value.train, form.value.date)
      .subscribe(
        (data) => {
          let newDate = [];
          newDate.push(data);
          this.otherTraining.push(...newDate);
          this.trainingAdded.emit(true);
          this.error = "Training added successfully";
          this.alertError = true;
        },
        (error) => {
          this.error = error;
          this.alertError = true;
        }
      );
  }

  removeTraining(id: number) {
    this.trainingService.deleteTraining(id).subscribe();
    this.otherTraining = this.otherTraining.filter((item) => item.id != id);
  }

  closeAlert(){
    this.alertError = false;
  }
}
