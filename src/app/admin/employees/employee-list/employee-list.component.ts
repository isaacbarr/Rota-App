import { Component, OnInit, Input } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { User } from "../../../models/user.model";
import { MDBModalRef, MDBModalService } from "angular-bootstrap-md";
import { CreateEmployeeComponent } from "../create-employee/create-employee.component";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"],
})
export class EmployeeListComponent implements OnInit {
  modalRef: MDBModalRef;
  employees: User[] = [];
  error = "";
  total: number;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: MDBModalService
  ) {}

  ngOnInit() {
    //request all employees
    this.employeeService.getEmployees().subscribe(
      (data) => {
        //set result to employee object
        (this.employees = data),
          //total employees = total length of employee array
          (this.total = this.employees.length);
      },
      (err) => {
        //any errors show to user
        this.error = err;
      }
    );
  }

  viewEmployee(user) {
    this.router.navigate([user.id], { relativeTo: this.route });
  }

  openModal() {
    this.modalRef = this.modalService.show(CreateEmployeeComponent);
  }
}
