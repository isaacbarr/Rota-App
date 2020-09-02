import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { MDBModalRef } from "angular-bootstrap-md";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmployeeService } from "src/app/services/employee.service";
import { User } from "../../../models/user.model";


@Component({
  selector: "app-create-employee",
  templateUrl: "./create-employee.component.html",
})
export class CreateEmployeeComponent implements OnInit {
  model: NgbDateStruct;
  employeeForm: FormGroup;
  error = "";
  formSubmitted = "";
  user: User[] = [];
  @Output() userCreated = new EventEmitter();

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phoneNo: ["", [Validators.required]],
      houseNo: ["", [Validators.required]],
      street: ["", [Validators.required]],
      city: ["", [Validators.required]],
      postcode: ["", [Validators.required]],
      dob: ["", Validators.required],
    });
  }

  onSubmit() {
    //create employee method call
    this.employeeService.createEmployee(this.employeeForm.value).subscribe(
      (user) => {
        this.user = user;
        //window reload with message user created
        window.alert("User created");
        location.reload()
      },
      (error) => {
        this.error = error;
      }
    );
  }

  closeModal() {
    this.modalRef.hide();
  }

  get email() {
    return this.employeeForm.get("email");
  }

  get name() {
    return this.employeeForm.get("name");
  }
  get phoneNo() {
    return this.employeeForm.get("phoneNo");
  }
  get houseNo() {
    return this.employeeForm.get("houseNo");
  }
  get street() {
    return this.employeeForm.get("street");
  }

  get city() {
    return this.employeeForm.get("city");
  }

  get postcode() {
    return this.employeeForm.get("postcode");
  }
}
