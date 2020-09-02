import { Component, OnInit, Input } from "@angular/core";
import { User } from "../../../../models/user.model";
import { EmployeeService } from "src/app/services/employee.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-profile",
  templateUrl: "./view-profile.component.html",
})
export class ViewProfileComponent implements OnInit {
  @Input() userId: number;

  user: User[] = [];
  error: string;
  message = "";

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployee(this.userId).subscribe((data) => {
      (this.user = data),
        (err) => {
          this.error = "unable to get employee details, please try again later";
        };
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (form.value.role != "user" && form.value.role != "admin") {
      this.error = "Invalid Role";
    } else {
      this.employeeService
        .editEmployeeAndRole(
          form.value.name,
          form.value.email,
          form.value.phoneNo,
          form.value.pay,
          form.value.houseNo,
          form.value.street,
          form.value.city,
          form.value.postcode,
          form.value.role,
          this.userId
        )
        .subscribe((data) => {
          (this.message = "Information updated"),
            this.user = data,
            (error) => {
              this.error = error;
            };
        });
    }
  }

  deleteUser() {
    this.employeeService.deleteUser(this.userId).subscribe(() => {
      window.alert("User deleted");
      this.router.navigate(["/admin/employees"]);
    });
  }
}
