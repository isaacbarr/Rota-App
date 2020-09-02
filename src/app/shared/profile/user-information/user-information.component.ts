import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/models/user.model";
import { EmployeeService } from "src/app/services/employee.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-user-information",
  templateUrl: "./user-information.component.html",
})
export class UserInformationComponent implements OnInit {
  @Input() userId: number;

  user: User[] = [];
  successMessage: string;
  passwordUpdate: boolean = false;
  informationUpdated: boolean = false;
  error: string;
  userPay: number;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployeeDetails(this.userId).subscribe((data) => {
      (this.user = data), (error) => (this.error = error);
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.employeeService
      .editEmployee(
        form.value.name,
        form.value.email,
        form.value.phoneNo,
        form.value.pay,
        form.value.houseNo,
        form.value.street,
        form.value.city,
        form.value.postcode,
        this.userId
      )
      .subscribe(
        (data) => {
          (this.informationUpdated = true),
            (this.successMessage = "Information updated"),
            (this.user = data);
        },
        (error) => {
          this.error = error;
        }
      );
  }

  passUpdate(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.employeeService
      .editEmployeePass(form.value.current, form.value.update, this.userId)
      .subscribe(
        (data) => {
          this.informationUpdated = true;
          this.successMessage = "Password updated";
        },
        (error) => {
          this.error = error;
        }
      );
  }

  reset() {
    this.informationUpdated = false;
  }
}
