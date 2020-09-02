import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ViewEmployeeModule } from "./view-employee/view-employee.module";

import { EmployeeComponent } from "./employee.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { CreateEmployeeComponent } from "./create-employee/create-employee.component";



@NgModule({
  declarations: [
    EmployeeListComponent,
    CreateEmployeeComponent,
    EmployeeComponent,

  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ViewEmployeeModule,

  ],
  exports: [EmployeeComponent],
})
export class EmployeeModule {}
