import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


import {PayrollReportsComponent} from './payroll-reports.component';
import { PayrollReportsControlsComponent } from './payroll-reports-controls/payroll-reports-controls.component'

@NgModule({
  declarations: [
    PayrollReportsComponent,
    PayrollReportsControlsComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  exports: [PayrollReportsComponent],
})
export class PayrollReportsModule {}
