import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
  selector: "app-view-employee",
  templateUrl: "./view-employee.component.html",
})
export class ViewEmployeeComponent implements OnInit {
  user: User[] = [];
  showProfileDiv: boolean = true;
  showShiftDiv: boolean = false;
  showHolidaysDiv: boolean = false;
  showTrainingDiv: boolean = false;

  userId: number;
  error: string = "";

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.userId = id;
    this.employeeService.getEmployee(id).subscribe(
      (data) => {
        this.user = data;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  return() {
    this.router.navigate(["/admin/employees"]);
  }

  showProfile() {
    this.showProfileDiv = !this.showProfileDiv;
    this.showShiftDiv = false;
    this.showHolidaysDiv = false;
    this.showTrainingDiv = false;
  }
  showShifts() {
    this.showShiftDiv = !this.showShiftDiv;
    this.showProfileDiv = false;
    this.showHolidaysDiv = false;
    this.showTrainingDiv = false;
  }
  showHolidays() {
    this.showHolidaysDiv = !this.showHolidaysDiv;
    this.showProfileDiv = false;
    this.showShiftDiv = false;
    this.showTrainingDiv = false;
  }

  showTraining() {
    this.showTrainingDiv = !this.showTrainingDiv;
    this.showProfileDiv = false;
    this.showShiftDiv = false;
    this.showHolidaysDiv = false;
  }

  trainingAdded(change: boolean) {
    this.showTrainingDiv = change;
  }

  ngOnChanges() {
    this.showTrainingDiv = true;
    this.showProfileDiv = false;
    this.showShiftDiv = false;
    this.showHolidaysDiv = false;
  }
}
